import axios from 'axios';

const BASE_API_URL = 'https://dummyjson.com';

export const usersRoot = axios.create({
  baseURL: BASE_API_URL,
});

const usersApi = {
  getUsers: () => usersRoot.get('/users'),
};

export default usersApi;
