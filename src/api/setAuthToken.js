
import api from "./api";

// This function sets or removes the Authorization header for Axios
const setAuthToken = (token) => {
  if (token) {
    // If token exists, attach it to all future API requests
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // If no token, remove the Authorization header
    delete api.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;