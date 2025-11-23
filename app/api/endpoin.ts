export const API_ENDPOINT = {
  BASE_URL: "http://localhost:5000",

  // Auth
  REGISTER: "/auth/admin/register",
  LOGIN: "/auth/admin/login",
  VERIFY: "/auth/admin/verify-email",
  VERIFY_TOKEN: "/auth/verify_token",

  // Channels
  ALL_CHANNELS: "/channel/all",
  CREATE_CHANNEL: "/channel/create",
  GET_CHANNEL_BY_ID: (id: string) => `/channel/${id}`,

  // Subjects
  ALL_SUBJECTS: "/subject/all",
  CREATE_SUBJECT: "/subject/create",
  GET_SUBJECT_BY_ID: (id: string) => `/subject/${id}`,
  UPDATE_SUBJECT: (id: string) => `/subject/update/${id}`,
  DELETE_SUBJECT: (id: string) => `/subject/delete/${id}`,

  // Tests
  ALL_TESTS_BY_SUBJECT: (subjectId: string) => `/test/subject/${subjectId}`,
  CREATE_TEST: "/test/create",
  GET_TEST_BY_ID: (id: string) => `/test/${id}`,
  UPDATE_TEST: (id: string) => `/test/update/${id}`,
  DELETE_TEST: (id: string) => `/test/delete/${id}`,

  // Users
  USER_PROFILE: (userId: string) => `/user/${userId}`,
};
