import axios from 'axios';
import apiConfig from '../config/mapquest';

export default {
  reverseGeoCoding: async (lat, lng) => {
    const { url, key } = apiConfig;
    console.log('XXX');
    return await axios.post(`${url}/reverse${key}`, {
      location: {
        latLng: {
          lat,
          lng,
        },
      },
      options: {
        thumbMaps: false,
      },
      includeNearestIntersection: true,
      includeRoadMetadata: true,
    });
  },
};
