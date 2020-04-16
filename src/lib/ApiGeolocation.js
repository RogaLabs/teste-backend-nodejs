import axios from 'axios';
import apiConfig from '../config/mapquest';

class ApiGeolocation {
  constructor() {
    this.configApi = apiConfig;
  }

  async reverseGeoCoding(lat, lng) {
    try {
      console.log(lat, lng);
      const { url, key } = this.configApi;
      const dataSend = {
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
      };

      const {
        data,
      } = await axios.get(`${url}/reverse?key=${key}&location=${lat},${lng}&includeRoadMetadata=true&includeNearestIntersection=true
`);
      const { results } = data;
      const [providedLocation] = results;
      const { locations } = providedLocation;
      const {
        street: logradouro,
        adminArea6: bairro,
        adminArea5: cidade,
        adminArea3: estado,
        adminArea1: pais,
        postalCode: cep,
      } = locations[0];

      const endereco = {
        logradouro,
        bairro,
        cidade,
        estado,
        pais,
        cep,
      };

      return endereco;
    } catch (err) {
      console.log('API', err);
    }
  }
}

export default new ApiGeolocation();
