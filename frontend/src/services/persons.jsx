import axios from 'axios'

const baseUrl = import.meta.env.DEV
  ? 'http://localhost:3001/api/persons'
  : '/api/persons'


const getAll = () => axios.get(baseUrl).then(res => res.data)
const create = (newPerson) => axios.post(baseUrl, newPerson).then(res => res.data)
const remove = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, remove }
