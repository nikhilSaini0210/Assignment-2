export const API_BASE_URL = 'http://testlink4.pillersofttechnologies.com/api';

export const TIMEOUT = 30000;

export const ACCESS_TOKEN_KEY = 'access_token';

export const HAS_VISITED_TO_ONBOARDING = '_has_visited_to_onboarding';

export const endPoints = {
  login: '/login',
  register: '/register',
  user: '/user',
};

export let isAppInitializing = true;

export const setAppInitializing = (value: boolean) => {
  isAppInitializing = value;
};
