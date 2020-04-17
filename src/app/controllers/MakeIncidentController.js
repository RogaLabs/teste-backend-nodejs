import * as yup from 'yup';
import { PrismaClient } from '@prisma/client';

import setAddressJob from '../jobs/SetAddress';
import getAddressJob from '../jobs/GetAddress';
import SaveDataInDB from '../jobs/SaveDataInDB';

import handlers from '../exceptions/handlers';
const { HandlerData, returnErrorResponse } = handlers;

import Queue from '../../lib/Queue';

class MakeIncidentController {
  async store(req, res) {
    try {
      const schema = yup.object().shape({
        latitude: yup.number().required(),
        longitude: yup.number().required(),
        denunciante: yup.object().shape({
          nome: yup.string().required(),
          cpf: yup.string().required(),
        }),
        denuncia: yup.object().shape({
          titulo: yup.string().required(),
          descricao: yup.string().required(),
        }),
      });

      if (!(await schema.isValid(req.body))) {
        const { error } = HandlerData;
        throw error;
      }

      const { latitude, longitude, denunciante, denuncia } = req.body;
      const address = { latitude, longitude };

      const getAddressQueue = await Queue.add(getAddressJob.key, {
        address,
      });

      getAddressQueue.on('succeeded', async (data) => {
        try {
          let endereco = JSON.parse(data);
          console.log(endereco);
          if (endereco && endereco.hasOwnProperty('message')) {
            const error = endereco;
            throw error;
          }

          if (!endereco) {
            const setAddressQueue = await Queue.add(setAddressJob.key, {
              address,
            });

            setAddressQueue.on('succeeded', async (data) => {
              try {
                //SET
                endereco = JSON.parse(data);

                if (endereco.hasOwnProperty('message')) {
                  const error = endereco;
                  throw error;
                }

                console.log('enderecoSet', endereco);
                const dataSaveDB = await Queue.add(SaveDataInDB.key, {
                  //SAVEDB1
                  latitude,
                  longitude,
                  denunciante,
                  denuncia,
                  endereco,
                });
                dataSaveDB.on('succeeded', (dataJson) => {
                  try {
                    const data = JSON.parse(dataJson);
                    if (data.hasOwnProperty('message')) {
                      const error = endereco;
                      throw error;
                    }

                    return res.json({ data });
                  } catch (error) {
                    returnErrorResponse(error, res);
                  }
                });
              } catch (error) {
                returnErrorResponse(error, res);
              }
            });
          } else {
            //SAVEDB2
            const dataSaveDB = await Queue.add(SaveDataInDB.key, {
              latitude,
              longitude,
              denunciante,
              denuncia,
              endereco,
            });

            dataSaveDB.on('succeeded', (dataJson) => {
              try {
                const data = JSON.parse(dataJson);
                if (data.hasOwnProperty('message')) {
                  const error = endereco;
                  throw error;
                }

                return res.json({ data });
              } catch (error) {
                returnErrorResponse(error, res);
              }
            });
          }
        } catch (error) {
          returnErrorResponse(error, res);
        }
      });
    } catch (error) {
      returnErrorResponse(error, res);
    }
  }
}

export default new MakeIncidentController();
