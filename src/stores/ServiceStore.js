import BaseStore from './BaseStore'
import _ from 'lodash'
import { http } from '../utils/http';
import { datetime } from '../utils/datetime';

const defaultData = {
  customer: {
    user_id: '',
    image: '',
    name: '',
    phone: '',
  },
  type_dog: false,
  type_cat: false,
  pet_type: [],
  qty: 1,
  sizes: '',
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
  date: datetime.moment().format(),
  time: '',
  payment: "cash",
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

  setCustomer(customer) {
    this.data.customer = customer;
  }

  async getCustomer(lineUserId) {
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

  setData(key, value){
    const data = this.toJS().data;
    _.set(data, key, value);
    this.data = data;
  }

  changePetType(type) {
    const data = this.toJS().data;
    switch (type) {
      case 'dog':
        this.data.type_dog = !data.type_dog;
        break;
      case 'cat':
        this.data.type_cat = !data.type_cat;
        break;
      default:
        break;
    }
  }

  async submit() {
    this.loading = true;
    try {
      let data = this.toJS().data;
      data.pet_type = [(data.type_dog) ? 'dog' : false, (data.type_cat) ? 'cat' : false].filter(val => val);
      const res = await http.post(`${process.env.API_URL}/v1/order`, {
        json: data,
      });
      console.log('submit response -> ', res);
    } catch (error) {
      console.log('submit error -> ', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  changeSourcePosition(position, address) {
    this.data.source.lat = position.lat;
    this.data.source.lng = position.lng;
    this.data.source.address = address;
  }

  changeDestinationPosition(position, address) {
    this.data.destination.lat = position.lat;
    this.data.destination.lng = position.lng;
    this.data.destination.address = address;
  }
}

export default new HomeStore();

