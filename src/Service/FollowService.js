import axios from "axios";

const FOLLOW_API_BASE_URL = "http://localhost:8080/Follow";

class FollowService{
    toggleFollow(userId , followerId){
        return axios.post(`${FOLLOW_API_BASE_URL}/${userId}?followerId=${followerId}`,{},{
            withCredentials: true
        }).then(res=>res.data);
    }
    
    checkFollow(paramId, userId){
        return axios
        .get(`${FOLLOW_API_BASE_URL}/${paramId}/isFollowing?followerId=${userId}`, {
            withCredentials: true
        })
        .then(res => res.data);
}

    // Get follower count
    getFollowerCount(userId) {
        return axios.get(`${FOLLOW_API_BASE_URL}/${userId}/followers/count`, {
            withCredentials: true
        }).then(res => res.data);
    }

    // Get following count
    getFollowingCount(userId) {
        return axios.get(`${FOLLOW_API_BASE_URL}/${userId}/following/count`, {
            withCredentials: true
        }).then(res => res.data);
    }

    // Get all followers
    getAllFollowers(userId) {
        return axios.get(`${FOLLOW_API_BASE_URL}/${userId}/followers`, {
            withCredentials: true
        }).then(res => res.data);
    }

    // Get all following
    getAllFollowing(userId) {
        return axios.get(`${FOLLOW_API_BASE_URL}/${userId}/following`, {
            withCredentials: true
        }).then(res => res.data);
    }
}

export default new FollowService;