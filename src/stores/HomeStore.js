import BaseStore from './BaseStore'
import _ from 'lodash'
import { http } from '../utils/http';

class HomeStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loading: false,
      data: [],
      list: [],
      selected: 0,
    });
  }

  async resetData() {
    this.data = [];
  }

  async getData(homeId) {
    this.loading = true;
    let url = `${process.env.CMS_API_URL}/v1/layouts/${homeId}`;
    let response = await http.get(url);
    if (response.statusCode === 200) {
      let data = response.body.data;
      delete data.data;
      this.data = data;
    } else {
      this.data = [];
    }
    this.loading = false;
  }
}
export default new HomeStore();

