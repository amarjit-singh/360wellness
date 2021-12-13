import axios from "axios";
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'

export const GlobalContext = React.createContext({});

const CustomAxios = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});
CustomAxios.defaults.headers.post["Content-Type"] = "application/json";
CustomAxios.defaults.headers.post["Accept"] = "application/json";

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

CustomAxios.setToken = function(token) {
  if (this.tokenInterceptor !== undefined) this.interceptors.request.eject(this.tokenInterceptor);
  this.tokenInterceptor = this.interceptors.request.use((req) => {
    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`
    } else {
      delete req.headers['Authorization']
    }
    return req
  })
}
export function GlobalContextProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useStickyState(null, 'authenticatedUser')
  const [accessToken, setAccessToken] = useStickyState(null, 'accessToken')
  const [apiBasePath, setApiBasePath] = useState(process.env.REACT_APP_API_URL)
  console.log(apiBasePath)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  CustomAxios.interceptors.response.use(res => {
    return res
  }, (err) => {
    console.log(err.data)
    // if (err.response.status === 422 && err.response.data && err.response.data.errors) {
    //   let errors = err.response.data.errors;
    //   setError(errors[ Object.keys(errors)[0] ][0])
    // }
    throw err
  })

  function setAuthInfo({user, token}) {
    setAuthenticatedUser(user)
    setAccessToken(token)
    CustomAxios.setToken(token)
  }

  function initAxios() {
    CustomAxios.setToken(accessToken)
  }
  
  function resetPassword(email) {
    // return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    // return authenticatedUser.updateEmail(email)
  }

  function updatePassword(password) {
    // return authenticatedUser.updatePassword(password)
  }

  const value = {
    setAuthInfo,
    axios: CustomAxios,
    authenticatedUser,
    apiBasePath,
    setAuthenticatedUser,
    initAxios,
    error,
    setError,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <GlobalContext.Provider value={value}>
      {!loading && children}
    </GlobalContext.Provider>
  )
}