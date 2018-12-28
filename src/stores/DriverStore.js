import BaseStore from './BaseStore'
import _ from 'lodash'
import { http } from '../utils/http';

class DriverStore extends BaseStore {
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
      let url = `${process.env.API_URL}/v1/driver/${userId}`;
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

  async saveData(driver) {
    this.loading = true;
    this.error = '';
    try {
      if (!driver.isOldUser) {
        await http.post(`${process.env.API_URL}/v1/driver`, { json: driver });
      } else {
        await http.put(`${process.env.API_URL}/v1/driver/${driver.user_id}`, { json: driver });
      }
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
}
export default new DriverStore();

