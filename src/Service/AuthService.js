// import axios from "axios";


// const API_BASE_URL = "http://localhost:8080/auth";

// class AuthService {
//   register(user) {
//     console.log(user)
//     return axios.post(API_BASE_URL + "/register", user, {
//       withCredentials: true, 
//     });
//   }

//   login(credentials) {
//     return axios.post(API_BASE_URL + "/login", credentials, {
//       withCredentials: true, 
//     });
//   }

//   getProfile() {
//     return axios.get("http://localhost:8080/users/me", {
//       withCredentials: true,
//     });
//   }

//   updateProfile(userId , updatedData){
//     return axios.put(`http://localhost:8080/users/${userId}`,updatedData , {
//       withCredentials :true,
//     });
//   }

//   logout() {
//     return axios.post("http://localhost:8080/logout", {}, {
//       withCredentials: true,
//     });
//   }
// }

// export default new AuthService();
