import axios from "axios";

const API_URL = "https://localhost:7256/api/Customer";

const getCustomers = (token) => {
  return axios.get(`${API_URL}/getall`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getFilteredCustomers = (token, filters) => {
    // Filtreleri query string formatına dönüştür
    const queryString = new URLSearchParams(filters).toString();
    return axios.get(`${API_URL}/getall`, {
      headers: { Authorization: `Bearer ${token}` },
      params: filters,
    });
  };


const deleteCustomer = (customer, token) => {
    
    return axios.post(`${API_URL}/delete`, 
        customer, // Doğrudan nesneyi gönderiyoruz
        {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
};

const updateCustomer = (customer, token) => {
    
    return axios.post(`${API_URL}/update`, 
        customer, // Doğrudan nesneyi gönderiyoruz
        {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
};

const addCustomer = (customer, token) => {

    return axios.post(`${API_URL}/add`, 
        customer, // Doğrudan nesneyi gönderiyoruz
        {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
};

export default { getCustomers, getFilteredCustomers ,deleteCustomer ,addCustomer ,updateCustomer};
