const URL = 'https://sable-childlike-chip.glitch.me/api/';
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
    console.log(err);
    return callback(err);
  }
};

export default fetchRequest;
