import Link from 'next/link';
import LoginForm
from '../../../components/LoginForm';

const Login=()=>{
    return(
        <div>
            <LoginForm/>
            <Link href={`./register`}>No account? Register</Link>
        </div>
    )
}


export default Login;