import api from "../axios";
import { API_ENDPOINT } from "../endpoin";

const authService = {
  login: async (email: string, password: string) => {
    const res = await api.post(API_ENDPOINT.LOGIN, { email, password });
    const { token, refreshToken, user } = res.data;

    if (token) localStorage.setItem("token", token);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    if (user) localStorage.setItem("user", JSON.stringify(user));

    return res.data;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await api.post(API_ENDPOINT.REGISTER, userData);
    const { email } = res.data;

    if (email) localStorage.setItem("onboardEmail", email);
    if (res.data.userId) localStorage.setItem("pendingUserId", res.data.userId);

    return res.data;
  },

  verify: async (code: string) => {
    const email = localStorage.getItem("onboardEmail");

    const res = await api.post(API_ENDPOINT.VERIFY, {
      email,
      code,
    });

    // Verify muvaffaqiyatli bo'lsa tokenlar qaytadi
    const { token, refreshToken, user } = res.data;
    if (token) localStorage.setItem("token", token);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    if (user) localStorage.setItem("user", JSON.stringify(user));

    // Tozalash
    localStorage.removeItem("onboardEmail");
    localStorage.removeItem("pendingUserId");

    return res.data;
  },

  verifyToken: async (token: string) => {
    return await api.post(API_ENDPOINT.VERIFY_TOKEN, { token });
  },

  getCurrentUser: async () => {
    const res = await api.get("/user/me"); // yoki backendda /auth/me bo'lsa shuni ishlat
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("onboardEmail");
    localStorage.removeItem("pendingUserId");
  },
};

export default authService;
