import { createContext, useContext, useEffect, useState } from "react"
import { getMe, loginUser, logoutUser, registerUser } from "../services/authService"

type User = {
    id: number
    name: string
    email: string
    role: 'owner' | 'member'
}

type RegisterPayload = {
  name: string
  email: string
  password: string
  confirmPassword: string
}


type AuthContextType = {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (data: RegisterPayload) => Promise<void>
    logout: () => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null> (null)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // check auth on page reload
    useEffect(() => {
        getMe().then((res) => setUser(res.data.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false))
    }, [])

    const login = async (email: string, password: string) => {
        await loginUser({email, password})
        const res = await getMe()
        setUser(res.data.user)
    }

    const register = async (data: RegisterPayload) => {
        await registerUser(data)
    }

    const logout = async () => {
        await logoutUser()
        setUser(null)
    }

    return (
        <AuthContext.Provider value = {{user, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )

}



