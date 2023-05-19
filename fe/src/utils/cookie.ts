import Cookie from 'js-cookie';

export const setCookie = (name: string, value: string, option?: any) => {
  return Cookie.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  return Cookie.get(name);
};
