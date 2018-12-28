import BaseStore from './BaseStore'
import _ from 'lodash'
import { http } from '../utils/http';

class DriverStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      data: {},
      isLoading: false,
      error: '',
    });
  }

  async resetData() {
    this.data = {};
    this.isLoading = false;
    this.error = '';
  }

  async getUser(userId) {
    this.loading = true;
    this.error = '';
    try {
      let url = `${process.env.API_URL}/v1/driver/${userId}`;
      let response = await http.get(url);
      console.log("======== response:", response);
      this.data = response;
    } catch (err) {
      console.log("======== err.message:", err.message);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async saveData(driver) {
    this.loading = true;
    this.error = '';
    try {
      let url = `${process.env.API_URL}/v1/driver`;
      let response = await http.post(url, { json: driver });
      console.log("======== response:", response);
    } catch (err) {
      console.log("======== err.message:", err.message);
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
}
export default new DriverStore();

