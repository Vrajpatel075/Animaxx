import axios from "axios";

const SAVE_API_BASE_URL = "http://localhost:8080/saved-posts";

class SavePostService {
  
  // Save a post
  savePost(userId, postId) {
    return axios.post(`${SAVE_API_BASE_URL}/save/${userId}/${postId}`, {
      withCredentials: true
    }).then(res => res.data);
  }

  // Unsave a post
  unsavePost(userId, postId) {
    return axios.delete(`${SAVE_API_BASE_URL}/unsave/${userId}/${postId}`, {
      withCredentials: true
    }).then(res => res.data);
  }

  // Get all saved posts for a user
  getSavedPosts(userId) {
    return axios.get(`${SAVE_API_BASE_URL}/${userId}`, {
      withCredentials: true
    }).then(res => res.data);
  }

  isSaved(userId, postId) {
  return axios.get(`${SAVE_API_BASE_URL}/isSaved/${userId}/${postId}`, {
    withCredentials: true
  }).then(res => res.data);
}

}

export default new SavePostService();
