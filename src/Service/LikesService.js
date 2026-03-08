import axios from "axios";

const LIKE_API_BASE_URL = "http://localhost:8080/Likes";

class LikeService {
    toggleLike(userId, postId) {
        return axios.post(`${LIKE_API_BASE_URL}/toggle/${userId}/${postId}`, {
            withCredentials: true
        }).then(res => res.data);
    }


  countLikes(postId) {
    return axios.get(`${LIKE_API_BASE_URL}/count/${postId}`, {
        withCredentials:true
    }).then(res=> res.data);
  }

  getLikedPosts(userId) {
    return axios.get(`${LIKE_API_BASE_URL}/user/${userId}`, {
        withCredentials:true
    }).then(res=> res.data);
  }
}

export default new LikeService;
