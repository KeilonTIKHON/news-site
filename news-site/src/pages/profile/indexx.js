import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../../../styles/styles.css'
import Header from '../../../components/Header';

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
            <Header></Header>
            <div className='profilecont'>

                <div>{isChanging ?
                    <div>
                        <h1 className='profile_h'>Edit Profile</h1>
                        <div className='infocont'>
                            <form onSubmit={handleChange}>
                                <input
                                className='changename'
                                    type="name"
                                    placeholder="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                                <input
                                className='changeEmail'
                                    type="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className='confirm_changes' type="submit">Confirm changes</button>

                            </form>
                            <button className='edit_button' onClick={() => { setIsChanging(isChanging => !isChanging) }}>Edit</button>
                        </div>
                    </div>
                    :
                    <div>
                        <h1 className='profile_h'>Profile</h1>
                        <div className='infocont'>
                            <p className='textuser'>Name: {user.name['en-US']}</p>
                            <p className='textuser1'>Email: {user.email}</p>
                            <button className='edit_button' onClick={() => { setIsChanging(isChanging => !isChanging) }}>Edit</button>
                        </div>

                    </div>}

                </div>


            </div>
        </div>

    );
};

export default ProfilePage;