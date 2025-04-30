// src/services/networkStats.ts
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export const fetchNetworkStats = async () => {
  const response = await axios.get(`${API_BASE}/network/stats`);
  return response.data;
};

export const fetchTVLHistory = async (range: string = '7d') => {
  const response = await axios.get(`${API_BASE}/network/tvl?range=${range}`);
  return response.data;
};

export const fetchEpochInfo = async () => {
  const response = await axios.get(`${API_BASE}/network/epoch`);
  return response.data;
};