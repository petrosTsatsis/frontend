import axios from "axios";
import authHeader from "./auth-header";

const NOTIFICATION_REST_API_URL = "http://localhost:8080/notifications/";

class NotificationService {

    MyNotifications() {
        return axios.get(NOTIFICATION_REST_API_URL + "myNotifications", { headers: authHeader() });
    }

}

export default new NotificationService();