import { Person } from '../types';
import md5 from './md5';

export const PERSON: Person = {
  avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp',
  first_name: '-',
  last_name: '',
  username: '-',
};

export function person(first_name: string, last_name: string, token = ''): Person {
  const username = `${first_name}${token && `.${token}`}.${last_name}`
    .replace(/\s/g, '')
    .toLowerCase();

  return {
    first_name,
    last_name,
    avatar: `https://gravatar.com/avatar/${md5(`${username}@jpmorgan.com`)}?d=identicon`,
    username,
  };
}
