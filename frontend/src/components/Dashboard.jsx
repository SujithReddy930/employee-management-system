import { useState, useEffect } from 'react'
import { Users, Building2, UserCheck, UserX } from 'lucide-react'
import { getEmployees, getDepartments } from '../api'

export default function Dashboard() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, deptRes] = await Promise.all([
          getEmployees(),
          getDepartments()
        ])
        setEmployees(empRes.data)
        setDepartments(deptRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const activeEmployees = employees.filter(e => e.status === 'ACTIVE').length
  const inactiveEmployees = employees.filter(e => e.status === 'INACTIVE').length

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-500 mt-1">Welcome to Employee Management System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Employees</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{employees.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Departments</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{departments.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Building2 className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{activeEmployees}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Inactive</p>
              <p className="text-3xl font-bold text-red-500 mt-1">{inactiveEmployees}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <UserX className="text-red-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Employees Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Recent Employees</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Name</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Position</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Department</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.slice(0, 5).map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{emp.position}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {emp.departmentName || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      emp.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : emp.status === 'INACTIVE'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                    No employees found. Add your first employee!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
