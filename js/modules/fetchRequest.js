//const URL = 'https://damp-ocean-68014.herokuapp.com/api/';
//const URL = 'https://stark-sea-70867.herokuapp.com/api/';
const URL = 'https://secret-retreat-14139.herokuapp.com/api/';
//const URL = 'http://localhost:3000/api/';
const fetchRequest = async (postfix, {
  method = 'get',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
      callback,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(`${URL}${postfix}`, options);
    if (response.ok) {
       const data = await response.json();
      if (callback)  callback(null, response.status);
      return data;
    }

    if (response.status === 404) {
      if (callback)  callback(null, response.status);
    }
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

  } catch (err) {
    return callback(err);
  }
};

export default fetchRequest;
