import axios from "axios";

const COMMENTS_API_BASE_URL = "http://localhost:8080/Comments"

class CommentService{

    AddComment(CommentData){
        return axios.post(COMMENTS_API_BASE_URL + '/addComment' , CommentData , {
            withCredentials:true,
        })
    }

    getallCommentsbyPostId(postId){
        return axios.get(COMMENTS_API_BASE_URL + `/post/${postId}` ,{
            withCredentials:true,
        }).then(res =>{
            return res.data;
        })
    }


}

export default new CommentService;