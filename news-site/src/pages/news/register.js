import RegisterForm from "../../../components/RegisterForm";
import Link from 'next/link';


const Register = () => {

    return (
        <div>
            <RegisterForm />
            <Link href={`./login`}>Already registered? Log in</Link>
        </div>
    )
}

export default Register;