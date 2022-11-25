import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-app-8e835-default-rtdb.firebaseio.com/",
});

export default api;
