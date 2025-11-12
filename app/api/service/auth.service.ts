import api from "../axios";
import { API_ENDPOINT } from "../endpoin";

const authService = {
  login: async (email: string, password: string) => {
    const res = await api.post(API_ENDPOINT.LOGIN, { email, password });
    const { token, refreshToken } = res.data;
    if (token && refreshToken) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    }
    return res.data;
  },

  register: async (userData: any) => {
    try {
      const res = await api.post(API_ENDPOINT.REGISTER, userData);
      const { token, refreshToken, email } = res.data;

      if (token && refreshToken) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
      }

      if (email) localStorage.setItem("onboardEmail", email);

      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.error || "Ro'yxatdan o'tishda xato"
        );
      }
      throw new Error("Tarmoqqa ulanishda xato");
    }
  },

  verify: async (code: string) => {
    try {
      const email = localStorage.getItem("onboardEmail");
      if (!email) throw new Error("Email topilmadi");
      const res = await api.post(API_ENDPOINT.VERIFY, { email, code });
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || "Kod noto‘g‘ri");
      }
      console.log("Kod To'gri");
    }
  },

  verify_token: async (token: string) => {
    try {
      const res = await api.post(API_ENDPOINT.VERIFY_TOKEN, { token });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  getCurrentUser: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};

export default authService;
