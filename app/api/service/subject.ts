import api from "../axios";
import { API_ENDPOINT } from "../endpoin";

const subject = {
  getAll: async () => {
    const res = await api.get(API_ENDPOINT.ALL_SUBJECTS);
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get(API_ENDPOINT.GET_SUBJECT_BY_ID(id));
    return res.data;
  },

  getByChannel: async (channelId: string) => {
    const res = await api.get(API_ENDPOINT.SUBJECT_BY_CHANNEL(channelId));
    return res.data;
  },

  getTestsByChannel: async (channelId: string) => {
    const res = await api.get(API_ENDPOINT.TEST_BY_CHANNEL(channelId));
    return res.data;
  },

  create: async (data: { name: string; channelId: string }) => {
    const res = await api.post(API_ENDPOINT.CREATE_SUBJECT, data);
    return res.data;
  },

  update: async (id: string, data: { name?: string }) => {
    const res = await api.patch(API_ENDPOINT.UPDATE_SUBJECT(id), data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(API_ENDPOINT.DELETE_SUBJECT(id));
    return res.data;
  },
};

export default subject;
