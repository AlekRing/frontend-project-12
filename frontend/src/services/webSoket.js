/* eslint-disable import/prefer-default-export */
const webSoket = new WebSocket('ws:://localhost:5001/');

webSoket.onerror = (error) => {
  console.log(error);
};

webSoket.onmessage = (event) => {
  console.log(event.data);
};

export { webSoket };
