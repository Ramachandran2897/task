import React from "react";
import axios from "axios";

axios.interceptors.request.use(
  async (request) => {
    request.url = `https://swapi.dev/api/people/${request.url}`;
    console.log('request', request)
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log('response', response)
    return response;
  }
);
