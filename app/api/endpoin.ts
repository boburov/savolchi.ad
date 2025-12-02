export const API_ENDPOINT = {
  BASE_URL: "http://localhost:5000",

  // Auth
  REGISTER: "/auth/register/admin",
  LOGIN: "/auth/login/admin",
  VERIFY: "/auth/validate/admin/code",
  VERIFY_TOKEN: "/auth/verify/admin/token",

  // Channels
  ALL_CHANNELS: "/chanel",
  CREATE_CHANNEL: (id: string) => `/chanel/${id}`,
  GET_CHANNEL_BY_ID: (id: string) => `/chanel/${id}`,
  UPDATE_CHANNEL: (id: string) => ``,
  DELETE_CHANNEL: (id: string) => ``,

  // Subjects
  ALL_SUBJECTS: "/subject",
  CREATE_SUBJECT: "/subject",
  GET_SUBJECT_BY_ID: (id: string) => `/subject/${id}`,
  UPDATE_SUBJECT: (id: string) => `/subject/${id}`,
  DELETE_SUBJECT: (id: string) => `/subject/${id}`,

  // Subject by Channel
  SUBJECT_BY_CHANNEL: (channelId: string) => `/subject/channel/${channelId}`,

  // Tests by Channel
  TEST_BY_CHANNEL: (channelId: string) => `/subject/channel/${channelId}/test`,

  // Tests
  ALL_TESTS: "/tests/all",
  CREATE_TEST: "/tests/create",
  GET_TEST_BY_ID: (id: string) => `/tests/${id}`,
  UPDATE_TEST: (id: string) => `/tests/edit/${id}`,
  DELETE_TEST: (id: string) => `/tests/${id}/delete`,

  // Users
  USER_PROFILE: (userId: string) => `/user/${userId}`,
};
