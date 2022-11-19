import { ref } from 'vue'
import axios from 'axios'

const employees = ref([])
const pages = ref(1)
const activePage = ref(1)
const loading = ref(false)
const pageSize = ref(8)

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_URL
    : import.meta.env.BASE_URL,
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
  pages.value = Number(response.headers['x-total-pages'])
  loading.value = false
}

getEmployees()

export default function useAPI() {
  return { employees, pages, activePage, loading, pageSize, getEmployees, api }
}
