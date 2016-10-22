import 'whatwg-fetch';
import merge from 'lodash.merge';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJSON = (response) => response.json();

export const getJson = (
  url = '',
  options = {},
  success = () => {},
  failure = (error) => (console.log('request failed', error))
) => {
  const defaults = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const opts = merge({}, defaults, options);
  fetch(url, opts)
  .then(checkStatus)
  .then(parseJSON)
  .then(success)
  .catch(failure);
};

export default {
  getJson,
};
