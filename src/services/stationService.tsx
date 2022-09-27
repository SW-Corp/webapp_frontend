import axios from 'axios';

export const baseUrl = 'http://10.0.0.1:8000';
export const workstation = 'testworkstation';
export const websocketBaseAddress = 'ws://10.0.0.1:8000/';

export const addTask = async (action: string, target: any, value: number) => {
  console.log({
    action: action,
    target: target,
    value: value,
    // conditions: {},
  });
  return await axios
    .post(
      `${baseUrl}/task/${workstation}`,
      {
        action: action,
        target: target,
        value: value,
        // conditions: {},
      },
      { withCredentials: true },
    )
    .then(res => {
      return res.status;
    })
    .catch(error => {
      return error.response.status;
    });
};
