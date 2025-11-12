import api from "../axios";
import { API_ENDPOINT } from "../endpoin";

const channel = {
  getAll: async () => {
    const res = await api.get(API_ENDPOINT.ALL);
    return res.data;
  },
};

export default channel;
