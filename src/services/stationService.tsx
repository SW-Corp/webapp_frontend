import axios from 'axios';

export const baseUrl = 'http://10.8.0.9:8000';
// export const baseUrl = 'http://localhost:8000';
export const workstation = 'testworkstation';
export const websocketBaseAddress = 'ws://10.8.0.9:8000/';
// export const websocketBaseAddress = 'ws://localhost:8000/';

export const addTask = async (action: string, target: any, value: number) => {
  console.log({
    action: action,
    target: target,
    value: value,
    // conditions: {},
  });
  return await axios
    .post(`${baseUrl}/task/${workstation}`, {
      action: action,
      target: target,
      value: value,
      // conditions: {},
    })
    .then(res => {
      return res.status;
    })
    .catch(error => {
      return error.response.status;
    });
};
