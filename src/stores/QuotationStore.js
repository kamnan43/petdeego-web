import BaseStore from './BaseStore'
import _ from 'lodash'
import { http } from '../utils/http';

class QuotationStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loading: false,
      data: {},
      orderId: null,
      price: 0,
      driver: {},
    });
  }

  async resetData() {
    this.data = [];
  }

  async setOrderId(orderId) {
    this.orderId = orderId;
  }

  async setDriver(driver) {
    this.driver = driver;
  }

  async setPrice(price) {
    this.price = price;
  }

  async getData(userId, orderId) {
    this.loading = true;
    let url = `${process.env.API_URL}/v1/quotation/${userId}/${orderId}`;
    let response = await http.get(url);
    if (response.statusCode === 200) {
      let data = response.body;
      this.data = data;
    } else {
      this.data = {};
    }
    this.loading = false;
  }

  async submit() {
    this.loading = true;
    let quotation = this.toJS();
    let url = `${process.env.API_URL}/v1/quotation`;
    let json = {
      data: {
        user_id: quotation.driver.userId,
        price: quotation.price,
        order_id: quotation.orderId,
      }
    }
    let response = await http.post(url, json);
    if (response.statusCode === 200) {
      let data = response.body;
      this.data = data;
    } else {
      this.data = {};
    }
    this.loading = false;
  }
}
export default new QuotationStore();

