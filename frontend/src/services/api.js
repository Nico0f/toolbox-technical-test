import CONFIG from '../config';

export const fetchFiles = async (fileName = '') => {
  try {
    const url = fileName 
      ? `${CONFIG.API_BASE_URL}/files/data?fileName=${encodeURIComponent(fileName)}`
      : `${CONFIG.API_BASE_URL}/files/data`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};