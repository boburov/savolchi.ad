import api from "../axios";
import { API_ENDPOINT } from "../endpoin";

const subject = {
  createSubject: async (data: { name: string; channelId: string }) => {
    try {
      const response = await api.post(API_ENDPOINT.CREATE_SUBJECT, data);

      if (!response.status || response.status !== 200) {
        console.error("API Error:", response.data);
        throw new Error(response.data.message || "Failed to create subject");
      }

      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || error.message.error);

      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Subject yaratishda xatolik yuz berdi"
      );
    }
  },
};

export default subject;
