// SoftwareLicenceService.js
import axios from "axios";
import authHeader from "./auth-header";

const LICENSE_REST_API_URL = "http://localhost:8080/softwareLicences";

class SoftwareLicenceService {
  getLicenses() {
    return axios.get(LICENSE_REST_API_URL, { headers: authHeader() });
  }

  getLicenseById(id) {
    return axios.get(LICENSE_REST_API_URL + "/" + id, { headers: authHeader() });
  }
}

export default new SoftwareLicenceService();