import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { ClipLoader } from "react-spinners";

const SignUp = () => {

  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);


  const handleSignup = async (e) => {
    e.preventDefault()

    if (!name) {
      seterror("Please enter you name")
    }

    if (!validateEmail(email)) {
      seterror("Please enter a valid email address.")
      return;
    }

    if (!password) {
      seterror("Please enter a password")
      return;
    }

    seterror(" ")
    setLoading(true);


    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password
      })

      if (response.data && response.data.error) {
        seterror(response.data.message)
        return
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        seterror(error.response.data.message)
      } else {
        seterror("An unexpected error occurred, Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>

        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignup} >
            <h4 className='text-2xl mb-7'>SignUp</h4>

            <input type='text' placeholder='Name'
              className='input-Box'
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input type='text' placeholder='Email'
              className='input-Box'
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            {error &&
              <p className='text-red-500 text-xs pb-1'>{error}</p>
            }

            <button type='submit' className='btn-primary'>{loading ? <ClipLoader color="white" size={18} /> : "Create Account"}</button>

            <p className='text-sm text-center mt-4'>
              Already have an account?{" "}
              <Link to="/" className='font-medium text-primary underline'>
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
