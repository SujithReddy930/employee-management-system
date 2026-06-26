import { useState, useEffect } from 'react'
import { Plus, Search, Pencil, Trash2, X } from 'lucide-react'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getDepartments } from '../api'

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    position: '', salary: '', joiningDate: '', status: 'ACTIVE',
    department: { id: '' }
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [empRes, deptRes] = await Promise.all([
        getEmployees(),
        getDepartments()
      ])
      setEmployees(empRes.data)
      console.log('EMPLOYEES LIST:', empRes.data)
      setDepartments(deptRes.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, form)
      } else {
        await createEmployee(form)
      }
      fetchData()
      closeModal()
    } catch (error) {
      console.error('Error saving employee:', error)
    }
  }

  const handleEdit = (emp) => {
    setEditingEmployee(emp)
    setForm({
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      phone: emp.phone,
      position: emp.position,
      salary: emp.salary,
      joiningDate: emp.joiningDate,
      status: emp.status,
      department: { id: emp.departmentId || '' }
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee(id)
      fetchData()
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingEmployee(null)
    setForm({
      firstName: '', lastName: '', email: '', phone: '',
      position: '', salary: '', joiningDate: '', status: 'ACTIVE',
      department: { id: '' }
    })
  }

  const filteredEmployees = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.position}`
      .toLowerCase().includes(search.toLowerCase())
  )
  console.log('DEPARTMENTS STATE:', departments)

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  )
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
          <p className="text-gray-500 mt-1">{employees.length} total employees</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Name</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Email</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Position</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Department</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Salary</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Status</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{emp.email}</td>
                  <td className="px-6 py-4 text-gray-600">{emp.position}</td>
                  <td className="px-6 py-4 text-gray-600">{emp.departmentName || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-600">₹{emp.salary?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      emp.status === 'ACTIVE' ? 'bg-green-100 text-green-700'
                      : emp.status === 'INACTIVE' ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-400">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingEmployee ? 'Edit Employee' : 'Add Employee'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => setForm({...form, firstName: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => setForm({...form, lastName: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Position</label>
                <input
                  type="text"
                  value={form.position}
                  onChange={e => setForm({...form, position: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Salary</label>
                <input
                  type="number"
                  value={form.salary}
                  onChange={e => setForm({...form, salary: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Joining Date</label>
                <input
                  type="date"
                  value={form.joiningDate}
                  onChange={e => setForm({...form, joiningDate: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Department</label>
                <select
                  value={form.department.id}
                  onChange={e => {
  console.log('Department selected:', e.target.value)
  setForm({...form, department: { id: e.target.value }})
}}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm({...form, status: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="ON_LEAVE">On Leave</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {editingEmployee ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}