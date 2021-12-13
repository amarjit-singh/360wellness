import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext } from "../GlobalContext"

export default function Header({children}) {
  const globalContext = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)

  function logout(event) {
    event.preventDefault()
    event.target.classList.toggle('disabled');
    setLoading(true)
    globalContext.axios
      .post("http://localhost/360wellness/test/backend/public/api/logout")
      .then(res => {
        if (res.data.success) {
          globalContext.setAuthInfo({user: null, token: null});
        } else {
          console.error(res.data);
        }
      }).finally(() => {
        setLoading(false)
      });
  }

  return (
    <>
      <div className="text-center" style={{'marginBottom': '30px'}}>
        <h1> Dashboard</h1>
        <h4> Hi {globalContext.authenticatedUser.name}!</h4>
        <Link className="btn" to='/update-profile'> Profile</Link>
        <Link className="btn" to='/'> Todos</Link>
        <a className="btn" disabled={loading} href='#' onClick={logout}> Logout</a>
      </div>
      {children}
    </>
  )
}