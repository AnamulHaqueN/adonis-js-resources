import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Register() {
    const {register} = useAuth()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await register({
        ...form, 
        email: form.email.toLocaleLowerCase()});
      alert("Registered successfully");
      navigate("/login");
    } catch (error: any) {
      // Axios error handling
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        // Vine validation error
        if (data?.errors?.length) {
          setErrorMessage(data.errors[0].message);
        } else if (data?.message) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("Registration failed");
        }
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            
            {errorMessage && (
              <p className="mb-4 text-sm text-red-600 text-center">
                {errorMessage}
              </p>
            )}

            {Object.keys(form)
            .map((key) => (
                <input
                  key={key}
                  className="w-full p-3 mb-4 border rounded"
                  placeholder={key}
                  type={key.includes('password') || key.includes('confirmPassword') ? 'password': 'text'}
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