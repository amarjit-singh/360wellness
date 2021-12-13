import React, { useRef, useState, useContext, useEffect } from "react"
import { GlobalContext } from "../GlobalContext"
import { Link, useNavigate  } from "react-router-dom"

export default function Signup() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const globalContext = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate ()

  async function handleSubmit(e) {
    e.preventDefault()
    globalContext.setError("")
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return globalContext.setError("Passwords do not match")
    }
    setLoading(true)
    let res = await globalContext.axios.post("http://localhost/360wellness/test/backend/public/api/signup", { 
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirm_password: passwordConfirmRef.current.value
    });
    if (res.data.success) {
      globalContext.setAuthInfo({user: res.data.data.user, token: res.data.data.access_token});
    } else {
      console.error(res.data);
    }
    navigate("/")
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center">Sign Up</h2>
      {globalContext.error && <div className="text-danger text-center">{globalContext.error}</div>}
      <table style={{'maxWigth': '50%', 'margin': 'auto'}}>
        <tbody>
            <tr id="name">
              <td>
                <label>Name</label>
              </td>
              <td>
                <input type="text" ref={nameRef} required />
              </td>
            </tr>
            <tr id="email">
              <td>
                <label>Email</label>
              </td>
              <td>
                <input type="email" ref={emailRef} required />
              </td>
            </tr>
            <tr id="password">
              <td>
                <label>Password</label>
              </td>
              <td>
                <input type="password" ref={passwordRef} required />
              </td>
            </tr>
            <tr id="password-confirm">
              <td>
              <label>Password Confirmation</label>
              </td>
              <td>
                <input type="password" ref={passwordConfirmRef} required />
              </td>
            </tr>
            <tr>
                <td>
                    <button disabled={loading} className="w-100" type="submit">
                    Sign Up
                    </button>
                </td>
            </tr>
            <tr>
                <td>
                    <div className="text-center">
                        Already have an account?
                    </div>
                </td>
                <td>
                    <Link to="/login">Log In</Link>
                </td>
            </tr>
        </tbody>
      </table>
    </form>
  )
}