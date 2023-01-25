import Moment from 'moment';

export const formatDate: any = (date: any, format: string) => {
  return Moment(date).format(format);
};

export const deepCopy = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

export const getSessionData = (): string | null => {
  const session: string | null = localStorage.getItem('user');
  return session;
};