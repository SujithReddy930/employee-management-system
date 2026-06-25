import { useState } from 'react'
import { Users, Building2, LayoutDashboard } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Employees from './components/Employees'
import Departments from './components/Departments'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-xl font-bold">EMS Portal</h1>
          <p className="text-blue-300 text-sm mt-1">Employee Management</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActivePage('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
              activePage === 'dashboard'
                ? 'bg-blue-700 text-white'
                : 'text-blue-200 hover:bg-blue-800'
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button
            onClick={() => setActivePage('employees')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
              activePage === 'employees'
                ? 'bg-blue-700 text-white'
                : 'text-blue-200 hover:bg-blue-800'
            }`}
          >
            <Users size={20} />
            Employees
          </button>
          <button
            onClick={() => setActivePage('departments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
              activePage === 'departments'
                ? 'bg-blue-700 text-white'
                : 'text-blue-200 hover:bg-blue-800'
            }`}
          >
            <Building2 size={20} />
            Departments
          </button>
        </nav>
        <div className="p-4 border-t border-blue-800">
          <p className="text-blue-300 text-xs">Employee Management System</p>
          <p className="text-blue-400 text-xs">v1.0.0</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'employees' && <Employees />}
        {activePage === 'departments' && <Departments />}
      </div>
    </div>
  )
}