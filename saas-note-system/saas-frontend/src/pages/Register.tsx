import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";


export default function Register() {
    const {register} = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            await register(form)
            navigate('/login')
            alert('Registered successfully')
        } catch(error) {
            alert('Registration Failed')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            {Object.keys(form).map((key) => (
                <input
                  key={key}
                  className="w-full p-3 mb-4 border rounded"
                  placeholder={key}
                  type={key.includes('password') ? 'password': 'text'}
                  value={(form as any)[key]}
                  onChange={(e) => setForm({...form, [key]: e.target.value})}
                />
            ))}

            <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
        </form>
        </div>
    )
}