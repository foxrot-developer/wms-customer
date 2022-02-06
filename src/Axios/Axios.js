import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://wmsss.herokuapp.com/api/',
});

Axios.interceptors.request.use((request) => {
  // document.querySelector('.overlay').style.display = 'flex';
  return request;
});

Axios.interceptors.response.use((response) => {
  // document.querySelector('.overlay').style.display = 'none';
  return response;
});

export default Axios;
