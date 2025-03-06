import Link from 'next/link';
import LoginForm
    from '../../../components/LoginForm';
    import Header from '../../../components/Header';

const Login = () => {
    return (
        <div className='logincont'>
            <Header></Header>
            <div className='logstuff'>
                <h1 className='login_head'>Log In</h1>
                <LoginForm />
                <div className='reglink'>
                    <Link href={`./register`}>No account? Register</Link>
                </div>

            </div>
        </div>

    )
}


export default Login;