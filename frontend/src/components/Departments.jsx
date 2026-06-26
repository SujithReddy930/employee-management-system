import { useState, useEffect } from 'react'
import { Plus, Search, Pencil, Trash2, X, Building2 } from 'lucide-react'
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from '../api'

export default function Departments() {
  const [departments, setDepartments] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingDept, setEditingDept] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '', description: '', managerName: '', location: ''
  })

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const res = await getDepartments()
      setDepartments(res.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      if (editingDept) {
        await updateDepartment(editingDept.id, form)
      } else {
        await createDepartment(form)
      }
      fetchData()
      closeModal()
    } catch (error) {
      console.error('Error saving department:', error)
    }
  }

  const handleEdit = (dept) => {
    setEditingDept(dept)
    setForm({
      name: dept.name,
      description: dept.description || '',
      managerName: dept.managerName,
      location: dept.location
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id)
        fetchData()
      } catch (error) {
        alert('Cannot delete — this department may still have employees assigned to it.')
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingDept(null)
    setForm({ name: '', description: '', managerName: '', location: '' })
  }

  const filteredDepartments = departments.filter(dept =>
    `${dept.name} ${dept.description} ${dept.managerName} ${dept.location}`
      .toLowerCase().includes(search.toLowerCase())
  )

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
          <h2 className="text-2xl font-bold text-gray-800">Departments</h2>
          <p className="text-gray-500 mt-1">{departments.length} total departments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by name, manager, location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map(dept => (
          <div key={dept.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Building2 className="text-purple-600" size={24} />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(dept)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(dept.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{dept.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{dept.description || 'No description'}</p>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Manager:</span> {dept.managerName}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Location:</span> {dept.location}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Employees:</span> {dept.employees?.length || 0}
              </p>
            </div>
          </div>
        ))}
        {filteredDepartments.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12">
            No departments found.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingDept ? 'Edit Department' : 'Add Department'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Manager Name</label>
                <input
                  type="text"
                  value={form.managerName}
                  onChange={e => setForm({...form, managerName: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm({...form, location: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                {editingDept ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}