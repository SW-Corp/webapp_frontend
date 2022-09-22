import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const addTask = async (action: string, target: any, value: number) => {
  return await axios
    .post(`${baseUrl}/task`, {
      action: action,
      target: target,
      value: value,
      conditions: {},
    })
    .then(res => {
      return res.status;
    })
    .catch(error => {
      return error.response.status;
    });
};
