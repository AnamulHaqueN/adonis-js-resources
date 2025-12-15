import './App.css'
import EmployeeList from './components/EmployeeList'
import Register from './components/Register'

function App() {

  return (
    <div>
      <h1>Employee CRUD</h1>
      <Register />
      <EmployeeList />
    </div>
  )
}

export default App
