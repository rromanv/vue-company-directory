import { ref } from 'vue'
import axios from 'axios'

const employees = ref([])
const pages = ref(1)
const activePage = ref(1)
const loading = ref(false)
const pageSize = ref(8)

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  auth: {
    username: import.meta.env.VITE_API_USERNAME,
    password: import.meta.env.VITE_API_PASSWORD,
  },
})

const getEmployees = async () => {
  loading.value = true
  const response = await api.get('/api/employees/', {
    params: {
      page: activePage.value,
      size: pageSize.value,
    },
  })
  employees.value = response.data
  pages.value = Number(response.headers['x-total-pages']) || 1
  loading.value = false
}

const getDepartment = async (id) => {
  const response = await api.get(`/api/departments/${id}`)
  return response.data
}

const useAPI = () => {
  return {
    employees,
    pages,
    activePage,
    loading,
    pageSize,
    getEmployees,
    getDepartment,
    api,
  }
}

export default useAPI
