export const APP_NAME = 'Galleria';

export const API_CONFIG = {
  BASE_URL: 'https://photo-sharing-api-bootcamp.do.dibimbing.id',
  API_KEY: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpaGVAZ21haWwuY29tIiwidXNlcklkIjoiOTk3MDIzYjctN2JhNC00ZTcyLWJkNmYtNTk1MDFiMmI3OTc2Iiwicm9sZSI6ImdlbmVyYWwiLCJpYXQiOjE3NjM4MTkzNzV9.ej2_bXXsliLxmcC2r7jmT9A6LPpmnGwaglbZEsrfJu4',
  TIMEOUT: 10000,
};

export const ROUTES = {
  HOME: '/',
  DISCOVER: '/discover',
  COLLECTIONS: '/collections',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  POSTS_PAGE_SIZE: 20,
  USERS_PAGE_SIZE: 50,
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
};

export const TRENDING_TAGS = [
  '#minimal',
  '#architecture',
  '#nature',
  '#urban',
  '#abstract',
  '#food',
  '#fashion',
  '#design',
  '#portrait',
  '#landscape',
];