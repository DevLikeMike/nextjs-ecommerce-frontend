// Package imports
import { FaUser } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
// Component imports
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthForm from "@/components/AuthForm";
import AuthContext from "@/context/AuthContext";

export default function RegisterPage() {
  // Register States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Password confirm state
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Context init
  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  // Submit handler hit register api route
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

    register({ username, email, password });
  };

  return (
    <Layout title='Coffee Cabinet | Register'>
      <main>
        <AuthForm>
          <h1>
            <FaUser /> Register
          </h1>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <div>
              <label htmlFor='passwordConfirm'>Confirm Password</label>
              <input
                type='password'
                id='passwordConfirm'
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            <input type='submit' value='Register' className='btn' />
          </form>

          <p>
            Already have an account?{" "}
            <Link href='/account/login'>
              <a className='link-blue'>Login</a>
            </Link>
          </p>
        </AuthForm>
      </main>
    </Layout>
  );
}
