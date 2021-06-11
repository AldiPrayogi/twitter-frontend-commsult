import axios from 'axios';

const API_URL = '/api/v1/tweets';

const createTweet = async (payload) => axios.post(`${API_URL}/`, payload, { validateStatus: () => true });

const updateTweet = async (tweetID, payload) => axios.put(`${API_URL}/${tweetID}`, payload, { validateStatus: () => true });

const getAllTweets = async () => axios.get(`${API_URL}/`, { validateStatus: () => true });

const deleteTweets = async (tweetID) => axios.delete(`${API_URL}/${tweetID}`, { validateStatus: () => true });

const tweetService = {
  createTweet, updateTweet, getAllTweets, deleteTweets,
};

export default tweetService;
