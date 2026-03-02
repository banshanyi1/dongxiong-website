import { http } from './http.js'

export const casesApi = {
  list() {
    return http.get('/cases')
  },
  detail(id) {
    return http.get(`/cases/${id}`)
  },
}

