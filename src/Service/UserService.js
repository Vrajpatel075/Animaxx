import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/users";

class UserService {
    register(users){
        return axios.post(USER_API_BASE_URL + "/Register" , users , {
            withCredentials: true, 
        });
    }

    login(LoginDetails){
        return axios.post(USER_API_BASE_URL + "/login" , LoginDetails , {
            withCredentials: true,
        });
    }

    getProfile(id){
        return axios.get(USER_API_BASE_URL + `/Profile/${id}` , {
            withCredentials:true,
        })
    }

    logout() {
        axios.post(USER_API_BASE_URL + "/logout", {}, { withCredentials: true })
        .then(() => {
            localStorage.removeItem("user"); 
            });
        }
}


export default new UserService();
