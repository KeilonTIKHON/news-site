import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isChanging, setIsChanging] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/api/profile');
                
                setUser(data.user);
                setName(data.user.name['en-US'])
                setEmail(data.user.email)
                console.log(data.user)
            } catch (error) {
                console.error('Profile Fetch Error:', error.message);
                router.push('/news/login'); // 
            }
        };

        fetchProfile();
    }, [router]);

    if (!user) {
        return <p>Loading...</p>;
    }


    
    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/profile', { name, email });
            console.log(response.data)
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || 'User information change failed');
        }
    };
    return (
        <div>

            <div>{isChanging ?
                <div>
                <form onSubmit={handleChange}>
                    <input
                        type="name"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                    />
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Confirm changes</button>
                </form>
            </div> :
                <div>
                    <h1>Profile Page</h1>
                    <p>Name: {user.name['en-US']}</p>
                    <p>Email: {user.email}</p>
                </div>}

            </div>
           
            <button onClick={()=>{setIsChanging(isChanging=>!isChanging)}}>Edit</button>
        </div>
    );
};

export default ProfilePage;