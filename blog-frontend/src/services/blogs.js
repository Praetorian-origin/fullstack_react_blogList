import axios from 'axios'
const baseUrl = BACKEND_URL + '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const addComment = (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }

  const request =  axios.post(`${baseUrl}/${id}/comments`, comment, config)
  return request.then(response => response.data)
}

const destroy = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, update: updateLikes, destroy, setToken, addComment }