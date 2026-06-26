import { useState, useEffect } from 'react'
import { Users, Building2, UserCheck, UserX, Clock } from 'lucide-react'
import { getEmployees, getDepartments } from '../api'

export default function Dashboard() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

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
  const onLeaveEmployees = employees.filter(e => e.status === 'ON_LEAVE').length

  const filteredEmployees = filter === 'ALL'
    ? employees.slice(0, 8)
    : employees.filter(e => e.status === filter).slice(0, 8)

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
        {/* Single line summary */}
        <p className="text-sm text-gray-500 mt-2">
          <span className="text-green-600 font-semibold">{activeEmployees} Active</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-red-500 font-semibold">{inactiveEmployees} Inactive</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-yellow-500 font-semibold">{onLeaveEmployees} On Leave</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-blue-600 font-semibold">{employees.length} Total</span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

        {/* Total Employees */}
        <div
          onClick={() => setFilter('ALL')}
          className={`bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition hover:shadow-md ${
            filter === 'ALL' ? 'border-blue-400 ring-2 ring-blue-200' : 'border-gray-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Total Employees</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{employees.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-blue-600" size={22} />
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Departments</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{departments.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Building2 className="text-purple-600" size={22} />
            </div>
          </div>
        </div>

        {/* Active */}
        <div
          onClick={() => setFilter('ACTIVE')}
          className={`bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition hover:shadow-md ${
            filter === 'ACTIVE' ? 'border-green-400 ring-2 ring-green-200' : 'border-gray-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{activeEmployees}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="text-green-600" size={22} />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div
          onClick={() => setFilter('INACTIVE')}
          className={`bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition hover:shadow-md ${
            filter === 'INACTIVE' ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Inactive</p>
              <p className="text-3xl font-bold text-red-500 mt-1">{inactiveEmployees}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <UserX className="text-red-500" size={22} />
            </div>
          </div>
        </div>

        {/* On Leave */}
        <div
          onClick={() => setFilter('ON_LEAVE')}
          className={`bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition hover:shadow-md ${
            filter === 'ON_LEAVE' ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-gray-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">On Leave</p>
              <p className="text-3xl font-bold text-yellow-500 mt-1">{onLeaveEmployees}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="text-yellow-500" size={22} />
            </div>
          </div>
        </div>

      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {filter === 'ALL' && 'Recent Employees'}
            {filter === 'ACTIVE' && '✅ Active Employees'}
            {filter === 'INACTIVE' && '❌ Inactive Employees'}
            {filter === 'ON_LEAVE' && '🕐 Employees On Leave'}
          </h3>
          {filter !== 'ALL' && (
            <button
              onClick={() => setFilter('ALL')}
              className="text-sm text-blue-600 hover:underline"
            >
              Show All
            </button>
          )}
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
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{emp.position}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {emp.department?.name || 'N/A'}
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
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                    No employees found.
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