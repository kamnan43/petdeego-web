import BaseStore from './BaseStore'
import _ from 'lodash'
import { http } from '../utils/http';

const defaultData = {
  customer: {
    user_id: '',
    image: '',
    name: '',
    phone: '',
  },
  pet_type: [],
  qty: 1,
  sizes: ['s', 'M'],
  owner: true | false,
  source: {
    address: '',
    lat: '',
    lng: '',
  },
  destination: {
    address: '',
    lat: '',
    lng: '',
  },
  date: '',
  time: '',
  payment: "line | cash",
  created: '',
  status: '',
}

class HomeStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loading: false,
      data: _.cloneDeep(defaultData),
      list: [],
      selected: 0,
    });
  }

  async resetData() {
    this.data = [];
  }

  changePetType(type) {
    this.data.pet_type = type;
  }

  changeQty(qty) {
    this.data.qty = qty;
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

