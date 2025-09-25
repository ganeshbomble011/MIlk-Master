import axios from 'axios';
import { CollectorMaster, MilkCollectionMaster } from '../types/modls';

const API_BASE = 'https://your-api-url.com/api';

export const getCollectors = async (): Promise<CollectorMaster[]> => {
  const response = await axios.get(`${API_BASE}/collectors`);
  return response.data;
};

export const createCollector = async (collectorData: Partial<CollectorMaster>): Promise<CollectorMaster> => {
  const response = await axios.post(`${API_BASE}/collectors`, collectorData);
  return response.data;
};

export const updateCollector = async (
  collectorId: number,
  collectorData: Partial<CollectorMaster>
): Promise<CollectorMaster> => {
  const response = await axios.put(`${API_BASE}/collectors/${collectorId}`, collectorData);
  return response.data;
};

export const deleteCollector = async (collectorId: number): Promise<void> => {
  await axios.delete(`${API_BASE}/collectors/${collectorId}`);
};

export const getTodayMilkCollections = async (): Promise<MilkCollectionMaster[]> => {
  const response = await axios.get(`${API_BASE}/milkCollections/today`);
  return response.data;
};

export const verifyMilkCollection = async (
  collectionId: number,
  approvedByAdminId: number
): Promise<any> => {
  const response = await axios.post(`${API_BASE}/milkCollections/${collectionId}/verify`, { approvedByAdminId });
  return response.data;
};
