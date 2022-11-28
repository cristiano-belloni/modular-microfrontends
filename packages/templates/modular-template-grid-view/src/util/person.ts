import { Person } from '../types';

export function person(
  first_name: string,
  last_name: string,
  token = '',
): Person {
  const username = `${first_name}${token && `.${token}`}.${last_name}`
    .replace(/\s/g, '')
    .toLowerCase();

  return {
    first_name,
    last_name,
    avatar: `https://robohash.org/${username}`,
    username,
  };
}
