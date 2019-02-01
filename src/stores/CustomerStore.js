import BaseStore from './BaseStore'
import _ from 'lodash'
import { http } from '../utils/http';

class CustomerStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      data: undefined,
      isLoading: false,
      error: '',
    });
  }

  async resetData() {
    this.data = undefined;
    this.isLoading = false;
    this.error = '';
  }

  async getUser(userId) {
    this.loading = true;
    this.error = '';
    try {
      let url = `${process.env.API_URL}/v1/customer/${userId}`;
      let response = await http.get(url);
      if (response.statusCode === 200) {
        this.data = response.body || {};
      } else this.data = undefined;
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async saveData(customer) {
    this.loading = true;
    this.error = '';
    try {
      if (!customer.isOldUser) {
        await http.post(`${process.env.API_URL}/v1/customer`, { json: driver });
      } else {
        await http.put(`${process.env.API_URL}/v1/customer/${customer.user_id}`, { json: customer });
      }
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
}
export default new CustomerStore();
