/**
 * @author Anthony Altieri on 11/1/16.
 */


const SERVER_PREFIX = process.env.NODE_ENV === 'production'
  ? 'http://backend'
  : 'http://localhost:7000';

export const send = (type, url, params = {}, withCredentials = true) => {
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    if (type !== 'POST' && type !== 'GET') {
      throw new Error(`Invalid xmlhttp type ${type}`);
    }
    if (process.env.NODE_ENV !== 'production'
        && url !== '/api/alert/get/active'
    ) {
      console.group(type);
      console.log('%c URL', 'color: blue', url);
      console.log('%c Params', 'color: green', params);
      console.groupEnd(type);
    }
    xmlhttp.open(type, SERVER_PREFIX + url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.withCredentials = withCredentials;
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState !== 4) return;
      if (xmlhttp.status === 200 || xmlhttp.status === 400) {
        try {
          const payload = JSON.parse(xmlhttp.responseText);
          if (process.env.NODE_ENV !== 'production') {
            console.log('payload', payload);
          }
          resolve(payload);
        } catch (e) {
          reject({
            text: 'response parse error'
          })
        }
      } else {
        reject({
          code: xmlhttp.status,
          text: xmlhttp.statusText,
        })
      }
    }
    try {
      if (!!params) {
        const parameters = JSON.stringify(params);
        xmlhttp.send(parameters);
      } else {
        xmlhttp.send();
      }
    } catch (e) {
      reject({
        text: 'params stringify error',
      })
    }
  });
};

export const post = (url, params = {}, withCredentials = true) => {
  return new Promise((resolve, reject) => {
    send('POST', url, params, withCredentials)
      .then((payload) => { resolve(payload) })
      .catch((error) => { reject(error) })
  })
};

export const get = (url, withCredentials = true) => {
  return new Promise((resolve, reject) => {
    send('GET', url, undefined, withCredentials)
      .then((payload) => { resolve(payload) })
      .catch((error) => { reject(error) })
  })
};




