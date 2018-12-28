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
      console.log("======== url:", url);
      let response = await http.post(url, { json: driver });
      console.log("======== response:", response);
      if (response.statusCode === 200) {
        // let { data } = response.body;
      } else {
        throw new Error('cannot save.');
      }
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
}
export default new DriverStore();

