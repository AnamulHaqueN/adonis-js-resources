import { useEffect, useState } from 'react'
import { api } from '../api'
import type { Employee } from '../type/Employee'
import EditEmployee from './EditEmployee'

export interface EmployeeResponse{
    data: Employee[]
}

const EmployeeList = () => {
  
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    
    const fetchEmployees = async () => {
        try {
            const res = await api.get<EmployeeResponse>('/employees')
            if(isMounted) {
                setEmployees(res.data.data)
            }
        } catch(err) {
            if(err instanceof Error) setError(err.message)
            else setError(String(err))
        } finally {
            if(isMounted) setLoading(false)
        }
         
    }

    fetchEmployees()

    return () => {
        isMounted = false
    }

  }, [])

  const handleDelete = async(id: number) => {
    try{
      await api.delete(`/employees/${id}`)
      setEmployees((prev) => prev.filter((e) => e.id !== id))
    } catch(err) {
        if(err instanceof Error) setError(err.message)
        else setError(String(err))
    }
  }

  const handleUpdate = (updated: Employee) => {
    setEmployees((prev) => prev.map((e) => e.id === updated.id ? updated: e))
    setEditEmployee(null)
  }

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div>
        <h2>Employee Details Table: </h2>
        {
            editEmployee&&(
                <EditEmployee
                employee={editEmployee}
                onCancel={() => setEditEmployee(null)}
                onUpdate={handleUpdate}
                />
            )
        }
        <table border={1} style={{marginTop:'20px'}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((e) => (
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.mobile}</td>
                        <td>
                            <button onClick={() => setEditEmployee(e)} >Edit</button>
                            <button onClick={() => handleDelete(e.id)} >Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default EmployeeList