import RegisterForm from "../../../components/RegisterForm";
import Link from 'next/link';
import Header from "../../../components/Header";


const Register = () => {

    return (
       
         <div className='logincont'>
         <Header></Header>
         <div className='logstuff'>
             <h1 className='login_head'>Sign Up</h1>
             <RegisterForm />
             <div className='reglink'>
             <Link href={`./login`}>Already registered? Log in</Link>
             </div>

         </div>
     </div>
    )
}

export default Register;