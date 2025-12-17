import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}: {children: JSX.Element}) {
    const {user, loading} = useAuth()

    if(loading) return <p>Loading...</p>
    if(!user) return <Navigate to="/login" />

    return children
}