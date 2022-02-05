// Package Import
import { FaUser } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
// Component Imports
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthForm from "@/components/AuthForm";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
  // Declare states to pass to our login function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Declare context and destruct functions we need from context
  const { login, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  // Handle Submits
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title='Coffee Cabinet | Login'>
      <main className='mt-3 authform'>
        <AuthForm>
          <h1>
            <FaUser /> Log In
          </h1>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input type='submit' value='Login' className='btn' />
          </form>

          <p>
            Don't have an account?{" "}
            <Link href='/account/register'>
              <a className='link-blue'>Register</a>
            </Link>
          </p>
        </AuthForm>
      </main>
    </Layout>
  );
}
