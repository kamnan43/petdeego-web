import BaseStore from './BaseStore'
import _ from 'lodash'
import { http } from '../utils/http';

class QuotationStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loading: false,
      data: {},
    });
  }

  async resetData() {
    this.data = [];
  }

  async getData(userId, orderId) {
    this.loading = true;
    let url = `${process.env.API_URL}/v1/quotation/${userId}/${orderId}`;
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
export default new QuotationStore();

