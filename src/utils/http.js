import humps from 'humps';
import request from 'then-request';

export class Http {
  constructor() {
    this.request = request;
  }

  // setAuthorization(options) {
  //   if (!options.headers) options.headers = {};
  //   options.headers['Authorization'] = `Bearer ${config.api.token}`;

  //   return options;
  // }

  parseBody(response) {
    if (response.body) response.body = JSON.parse(response.body);
    return response;
  }

  async get(url, options = {}) {
    let response = await this.request('GET', url, options);
    return this.parseBody(response);
  }

  async post(url, options = {}) {
    console.log('----> options', options);
    // options = this.setAuthorization(options);
    // options.json = humps.decamelizeKeys(options.json);
    let response = await this.request('POST', url, options);
    return this.parseBody(response);
  }

  async put(url, options = {}) {
    // options = this.setAuthorization(options);
    // options.json = humps.decamelizeKeys(options.json);
    let response = await this.request('PUT', url, options);
    return this.parseBody(response);
  }

  async delete(url, options = {}) {
    // options = this.setAuthorization(options);
    let response = await this.request('DELETE', url, options);
    return this.parseBody(response);
  }
}

export const http = new Http();
export default http;
