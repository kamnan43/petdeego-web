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

  async saveData(driver) {
    this.loading = true;
    this.error = '';
    try {
      let url = `${process.env.API_URL}/v1/driver`;
      console.log("======== driver:", driver);
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

