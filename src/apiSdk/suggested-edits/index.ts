import axios from 'axios';
import queryString from 'query-string';
import { SuggestedEditInterface, SuggestedEditGetQueryInterface } from 'interfaces/suggested-edit';
import { GetQueryInterface } from '../../interfaces';

export const getSuggestedEdits = async (query?: SuggestedEditGetQueryInterface) => {
  const response = await axios.get(`/api/suggested-edits${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSuggestedEdit = async (suggestedEdit: SuggestedEditInterface) => {
  const response = await axios.post('/api/suggested-edits', suggestedEdit);
  return response.data;
};

export const updateSuggestedEditById = async (id: string, suggestedEdit: SuggestedEditInterface) => {
  const response = await axios.put(`/api/suggested-edits/${id}`, suggestedEdit);
  return response.data;
};

export const getSuggestedEditById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/suggested-edits/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSuggestedEditById = async (id: string) => {
  const response = await axios.delete(`/api/suggested-edits/${id}`);
  return response.data;
};
