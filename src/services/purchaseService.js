import axios from "axios";
import authHeader from "./auth-header";

const LICENSE_REST_API_URL = "http://localhost:8080/purchases";

class CustomerService {
  getAllPurchases() {
    return axios.get(LICENSE_REST_API_URL, { headers: authHeader() });
  }

  getPurchase(id) {
    return axios.get(LICENSE_REST_API_URL + "/" + id, { headers: authHeader() });
  }
}

export default new CustomerService();