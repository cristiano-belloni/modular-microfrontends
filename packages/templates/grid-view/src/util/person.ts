import { Person } from '../types';
import md5 from './md5';

export function person(first_name: string, last_name: string, token = ''): Person {
  const username = `${first_name}${token && `.${token}`}.${last_name}`
    .replace(/\s/g, '')
    .toLowerCase();
  const email = `${username}@jpmorgan.com`;

  return {
    first_name,
    last_name,
    avatar: `https://gravatar.com/avatar/${md5(email)}?d=identicon`,
    email,
    username,
  };
}
