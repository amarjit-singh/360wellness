import React, { useRef, useState, useContext } from "react"
import { GlobalContext } from "../GlobalContext"
import { Link, useNavigate  } from "react-router-dom"

export default function Login() {
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
    setLoading(true)
    globalContext.axios
      .post(globalContext.apiBasePath+"/api/login", { email: emailRef.current.value, password: passwordRef.current.value })
      .then(res => {
        if (res.data.success) {
          globalContext.setAuthInfo({user: res.data.data.user, token: res.data.data.access_token});
          setTimeout(() => {navigate("/");}, 1000)
        } else {
          console.error(res.data);
          globalContext.setError("Wrong email or password!")
        }
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center">Login In</h2>
      {globalContext.error && <div className="text-danger text-center">{globalContext.error}</div>}
      <table style={{'maxWigth': '50%', 'margin': 'auto'}}>
        <tbody>
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
            <tr>
              <td></td>
                <td>
                    <button disabled={loading} className="w-100" type="submit">
                    Login
                    </button>
                </td>
            </tr>
            <tr>
                <td>
                    <div className="text-center">
                        Don't have an account?
                    </div>
                </td>
                <td>
                    <Link to="/signup">Sign Up</Link>
                </td>
            </tr>
        </tbody>
      </table>
    </form>
  )
}