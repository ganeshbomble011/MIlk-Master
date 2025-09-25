import axios from 'axios';

const API_URL = 'http://maheshjagzap-001-site1.qtempurl.com/api';

export const loginUser = async (email: string, password: string) => {
    const payload = {
      userName: email,
      passWord: password,
    };
  
    try {
      const response = await axios.post(`${API_URL}/user/login`, payload);
      return response.data; // matches your sample response
    } catch (error) {
      throw error;
    }
  };
