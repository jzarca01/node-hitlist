const axios = require('axios');
const RESULTS_LIMIT = 100;

class Hitlist {
  constructor() {
    this.request = axios.create({
      baseURL: 'https://my.hitlistapp.com',
      headers: {
        'X-Hitlist-Version': '6.5.1'
      }
    });
  }

  setAccessToken(accessToken) {
    this.request.defaults.headers.common['Authorization'] = '';
    delete this.request.defaults.headers.common['Authorization'];

    this.request.defaults.headers.common[
      'Authorization'
    ] = `token ${accessToken}`;
  }

  async listAirports() {
    try {
      const airports = await this.request({
        method: 'GET',
        url: '/api/8/airports/'
      });
      return airports.data;
    } catch (err) {
      console.log('error with listAirports', err);
    }
  }

  async createSession(airport) {
    try {
      const profile = await this.request({
        method: 'POST',
        url: '/api/8/register/deferred/',
        data: {
          airport: airport
        }
      });
      this.setAccessToken(profile.data.token);
      return profile.data;
    } catch (err) {
      console.log('error with createSession', err);
    }
  }

  async getProfile() {
    try {
      const profile = await this.request({
        method: 'GET',
        url: '/api/8/me/'
      });
      return profile.data;
    } catch (err) {
      console.log('error with getProfile', err);
    }
  }

  async getTrips() {
    try {
      const trips = await this.request({
        method: 'GET',
        url: '/api/8/trips/',
        params: {
          context: 'mine'
        }
      });
      return trips.data;
    } catch (err) {
      console.log('error with getTrips', err);
    }
  }

  async getCities(list) {
    try {
      const cities = await this.request({
        method: 'GET',
        url: '/api/8/cities/',
        params: {
          limit: RESULTS_LIMIT,
          list: list
        }
      });
      return cities.data;
    } catch (err) {
      console.log('error with getCities', err);
    }
  }

  async getListDetails(listId) {
    try {
      const listDetails = await this.request({
        method: 'GET',
        url: `/api/8/lists/${listId}/`
      });
      return listDetails.data;
    } catch (err) {
      console.log('error with getListDetails', err);
    }
  }

  async getFeaturedList(listId) {
    try {
      return {
        listDetails: await this.getListDetails(listId),
        listCities: await this.getCities(50, listId)
      };
    } catch (err) {
      console.log('error with getFeaturedList', err);
    }
  }

  async getCity(citySlug) {
    try {
      const city = await this.request({
        method: 'GET',
        url: `/api/8/cities/${citySlug}/`
      });
      return city.data;
    } catch (err) {
      console.log('error with getCity', err);
    }
  }

  async getDealsByCity(citySlug) {
    try {
      const deals = await this.request({
        method: 'GET',
        url: `/api/8/deals/for/${citySlug}/`,
        params: {
          dates_exact: 1,
          limit: RESULTS_LIMIT
        }
      });
      return deals.data;
    } catch (err) {
      console.log('error with getDealsByCity', err);
    }
  }

  async getHotelsByCity(citySlug) {
    try {
      const hotels = await this.request({
        method: 'GET',
        url: `/api/8/cities/${citySlug}/hotels/`,
        params: {
          limit: RESULTS_LIMIT
        }
      });
      return hotels.data;
    } catch (err) {
      console.log('error with getHotelsByCity', err);
    }
  }
}

module.exports = Hitlist;
