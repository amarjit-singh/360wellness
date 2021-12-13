import { React, useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { GlobalContext } from "./GlobalContext"
import Header from "./components/Header"

export default function PrivateRoute({ ...props }) {
  const { authenticatedUser } = useContext(GlobalContext);
  return authenticatedUser ? <Header><Outlet /></Header> : <Navigate to="/login" />;
}