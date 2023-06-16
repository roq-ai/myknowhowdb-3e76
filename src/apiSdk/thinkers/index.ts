import axios from 'axios';
import queryString from 'query-string';
import { ThinkerInterface, ThinkerGetQueryInterface } from 'interfaces/thinker';
import { GetQueryInterface } from '../../interfaces';

export const getThinkers = async (query?: ThinkerGetQueryInterface) => {
  const response = await axios.get(`/api/thinkers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createThinker = async (thinker: ThinkerInterface) => {
  const response = await axios.post('/api/thinkers', thinker);
  return response.data;
};

export const updateThinkerById = async (id: string, thinker: ThinkerInterface) => {
  const response = await axios.put(`/api/thinkers/${id}`, thinker);
  return response.data;
};

export const getThinkerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/thinkers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteThinkerById = async (id: string) => {
  const response = await axios.delete(`/api/thinkers/${id}`);
  return response.data;
};
