import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/api/profile');
                setUser(data.user);
                console.log(data.user)
            } catch (error) {
                console.error('Profile Fetch Error:', error.message);
                router.push('/login'); // Перенаправляем на логин, если пользователь не авторизован
            }
        };

        fetchProfile();
    }, [router]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Name: {user.name['en-US']}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default ProfilePage;