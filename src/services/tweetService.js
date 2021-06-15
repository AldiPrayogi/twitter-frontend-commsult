import axios from 'axios';

const API_URL = '/api/v1/tweets';

const createTweet = async (payload) => axios.post(`${API_URL}/`, payload, { validateStatus: () => true });

const updateTweet = async (tweetID, payload) => axios.put(`${API_URL}/${tweetID}`, payload, { validateStatus: () => true });

const getAllTweets = async (sortingValue) => axios.get(`${API_URL}/?sortingValue=${sortingValue}`, { validateStatus: () => true });

const deleteTweets = async (tweetID) => axios.delete(`${API_URL}/${tweetID}`, { validateStatus: () => true });

const getTweetsBy = async (tweetMessage) => axios.get(`${API_URL}/${tweetMessage}`, { validateStatus: () => true });

const tweetService = {
  createTweet, updateTweet, getAllTweets, deleteTweets, getTweetsBy,
};

export default tweetService;
