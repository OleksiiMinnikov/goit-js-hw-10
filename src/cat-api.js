import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] =
  'live_FKODWTLPidV9Vi5VFGbdH174LaEiofgOurSPDcDvsAxK3Pw3ECyTM87A6njT2uTJ';

function fetchBreeds() {
  return axios.get('/breeds/').then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    // console.log(response.data);
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`images/search?breed_ids=${breedId}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

export { fetchBreeds, fetchCatByBreed };
