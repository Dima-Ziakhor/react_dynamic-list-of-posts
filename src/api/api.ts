export const BASE_URL = 'https://mate.academy/students-api';

export async function request(url: string, data = {}) {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, data);

    return response;
  } catch {
    throw new Error('Fetch failed');
  }
}
