import axios from "axios";

const POST_API_BASE_URL = "http://localhost:8080/posts";

class PostService{
    createPost(postFormData){
        return axios.post(POST_API_BASE_URL + "/upload" , postFormData ,{
            withCredentials:true,
            headers: { "Content-Type": "multipart/form-data" }
        })
    }

    getUserPost(userId){
        return axios.get(POST_API_BASE_URL + `/userposts/${userId}`,{
            withCredentials:true,}
         ).then(response =>{
            return  response.data;
         })
    }

    getAllPosts(){
        return axios.get(POST_API_BASE_URL , {
            withCredentials:true}).then(response =>{
                return response.data;
            })
    }

    getPostByPostId(postId){
        return axios.get(POST_API_BASE_URL + `/${postId}`, {
            withCredentials:true}).then(response => {
                return response.data;
            })
        }



}

export default new PostService;