import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8080/api'
})

// Department APIs
export const getDepartments = () => API.get('/departments')
export const createDepartment = (data) => API.post('/departments', data)
export const updateDepartment = (id, data) => API.put(`/departments/${id}`, data)
export const deleteDepartment = (id) => API.delete(`/departments/${id}`)

// Employee APIs
export const getEmployees = () => API.get('/employees')
export const getEmployeeById = (id) => API.get(`/employees/${id}`)
export const createEmployee = (data) => API.post('/employees', data)
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data)
export const deleteEmployee = (id) => API.delete(`/employees/${id}`)
export const searchEmployees = (keyword) => API.get(`/employees/search?keyword=${keyword}`)
export const getEmployeesByDepartment = (id) => API.get(`/employees/department/${id}`)
export const getEmployeesByStatus = (status) => API.get(`/employees/status/${status}`)