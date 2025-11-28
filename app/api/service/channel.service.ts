import api from "../axios";
import { API_ENDPOINT } from "../endpoin";

const channel = {
  getAll: async () => {
    const res = await api.get(API_ENDPOINT.ALL_CHANNELS);
    return res.data;
  },

  get_chanel_by_id: async (id: string) => {
    const res = await api.get(API_ENDPOINT.GET_CHANNEL_BY_ID(id));
    return res.data;
  },

  create_chanel: async (formData: FormData, adminId: string) => {
    const res = await api.post(
      API_ENDPOINT.CREATE_CHANNEL(adminId),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  },

  update_channel: async (id: string, formData: FormData) => {
    const res = await api.patch(
      API_ENDPOINT.UPDATE_CHANNEL(id),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return res.data;
  },

  delete_channel: async (id: string) => {
    const res = await api.delete(API_ENDPOINT.DELETE_CHANNEL(id));
    return res.data;
  },
};

export default channel;
