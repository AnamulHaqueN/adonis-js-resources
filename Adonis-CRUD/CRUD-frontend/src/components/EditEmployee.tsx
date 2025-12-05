
import { useState } from 'react'
import type { Employee } from '../type/Employee'
import { api } from '../api'

interface EditEmployeeProps {
    employee: Employee
    onCancel: () => void
    onUpdate: (updated: Employee) => void
} 

const EditEmployee = ({employee, onCancel, onUpdate}: EditEmployeeProps) => {
  
  const [form, setForm] = useState<Employee>(employee)
  const [error, setError] = useState(null)
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
      const res = await api.patch(`employees/${employee.id}`, form)
      onUpdate(res.data.data)
    } catch(err) {
        if(err instanceof Error) setError(err)
        else setError(String(err))
    }
   
  }

  return (
    <form onSubmit={handleSubmit}>
        <h3>Edit Employee Id : </h3>
        <div>
        <input type="name" name="name" value={form.name} onChange={handleChange} placeholder='Enter your name' required />
        </div>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder='Enter your email' required />
        <input type="text" name="mobile" value={form.mobile ? form.mobile: ''} onChange={handleChange} placeholder='Enter your mobile no' />
        <input type="text" name="dob" value={form.dob? form.dob: ''} onChange={handleChange} placeholder='Enter your date of birth' />
        <input type="text" name="doj" value={form.doj? form.doj: ''} onChange={handleChange} placeholder='Enter your date of job' />
        <input type="text" name="address" value={form.address? form.address: ''} onChange={handleChange} placeholder='Enter your address' />
        <button type="submit">Update</button>
        <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}

export default EditEmployee