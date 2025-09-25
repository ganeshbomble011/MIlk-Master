import axios from 'axios';

const API_BASE = 'https://your-api-url.com/api';

// Submit milk collection by collector
export const submitMilkCollection = async (data: {
  collectorId: number;
  farmerId: number;
  collectionDate: string;
  quantityLitres: number;
  fatContent?: number;
  snfContent?: number;
}) => {
  const response = await axios.post(`${API_BASE}/milkCollections`, data);
  return response.data;
};

// Get milk collection history for a collector (optionally by date)
export const getCollectionHistory = async (collectorId: number, date?: string) => {
  let url = `${API_BASE}/milkCollections/collector/${collectorId}`;
  if (date) {
    url += `?date=${date}`;
  }
  const response = await axios.get(url);
  return response.data; // array of milk collections for that collector
};

// Get list of farmers for dropdown or selection in collection form
export const getFarmers = async () => {
  const response = await axios.get(`${API_BASE}/farmers`);
  return response.data; // array of FarmerMaster
};
