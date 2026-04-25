import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import Navbar from '../../components/Navbar/Navbar'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { ClipLoader } from "react-spinners";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();



    if (!validateEmail(email)) {
      seterror("Please enter a valid email address.")
      return;
    }


    if (!password) {
      seterror("Please enter a password")
      return;
    }

    seterror("")
    setLoading(true);

    try {

      const response = await axiosInstance.post("/login", {
        email: email,
        password: password
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard");

      }

    } catch (error) {

      if (error.response && error.response.data && error.response.data.message) {
        seterror(error.response.data.message)
      } else {
        seterror("An unexpected error accurred, Please try again.")
      }

    } finally {
      setLoading(false)
    }
  };



  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>

        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>

            <input type='text' placeholder='Email'
              className='input-Box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            {error &&
              <p className='text-red-500 text-xs pb-1'>{error}</p>
            }

            <button type='submit' className='btn-primary'>{loading ? <ClipLoader color="white" size={18}/> : "Log In"}</button>

            <p className='text-sm text-center mt-4'>
              Not registered yet?{" "}
              <Link to="/signUp" className='font-medium text-primary underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>

  )
}

export default Login
