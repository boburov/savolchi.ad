import api from "../axios";
import { API_ENDPOINT } from "../endpoin";

const channel = {
  getAll: async () => {
    const res = await api.get(API_ENDPOINT.ALL_CHANNELS);
    return res.data;
  },
  get_chanel_by_id: async (id: string) => {
    const res = await api.get(API_ENDPOINT.GET_CHANNEL_BY_ID(id));
    return res;
  },
  create_chanel: async (data: any) => {
    const res = await api.post(API_ENDPOINT.CREATE_CHANNEL, data);
    return res.data;
  },
};

export default channel;
