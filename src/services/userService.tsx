// import fetch, { RequestInit } from 'node-fetch'
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const signUp = async (email: string, password: string) => {
  return await axios
    .post(`${baseUrl}/signup`, {
      email: email,
      password: password,
    })
    .then(res => {
      return res.status;
    })
    .catch(error => {
      return error.response.status;
    });
};

export const logIn = async (email: string, password: string) => {
  return await axios
    .post(
      `${baseUrl}/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true },
    )
    .then(res => {
      return res;
    })
    .catch(error => {
      return error.response;
    });
};

export const logOut = async () => {
  return await axios
    .get(`${baseUrl}/logout`, { withCredentials: true })
    .then(res => {
      localStorage.removeItem('islogged');
      return res.status;
    })
    .catch(error => {
      return error.response.status;
    });
};
