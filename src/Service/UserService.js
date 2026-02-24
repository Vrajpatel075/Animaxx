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

    edit(id,userData){
        return axios.put(USER_API_BASE_URL + `/Edit/${id}` , userData ,{
            withCredentials:true })
    }
    uploadProfilePicture(id , file){
        const formData = new FormData();
        formData.append("file", file);

        return axios.post(USER_API_BASE_URL + `/uploadProfilePicture/${id}` , formData , {
            withCredentials: true
        });
    }

    getProfile(id){
        return axios.get(USER_API_BASE_URL + `/Profile/${id}` , {
            withCredentials:true,
        })
    }

    logout() {
        return axios.post(USER_API_BASE_URL + "/logout", {}, { withCredentials: true })
        .then(() => {
            localStorage.removeItem("user"); 
            });
        }

    cheakusername(username){
        return axios.get(USER_API_BASE_URL + `/cheakUsername?username=${username}`, {
        withCredentials: true
    });
    }
}


export default new UserService();
