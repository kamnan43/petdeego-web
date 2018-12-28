import BaseStore from './BaseStore'
import _ from 'lodash'
import { http } from '../utils/http';

const homeId = '5b9dec47c3960686838d8162';

class ContentStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loading: false,
      data: [],
      list: [],
      selected: 0,
    });
  }

  async getContentByViewId(vid) {
    try {
      this.loading = true;
      let url = `${process.env.CMS_API_URL}/v1/contents/vid/${vid}`;
      let response = await http.get(url);
      if (response.statusCode === 200) {
        let data = response.body.data;
        delete data._id;
        this.data = data;
      } else {
        this.data = [];
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}

export default new ContentStore();

