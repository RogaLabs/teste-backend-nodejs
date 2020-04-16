import * as yup from 'yup';
import { PrismaClient } from '@prisma/client';

import setAddressJob from '../jobs/SetAddress';
import getAddressJob from '../jobs/GetAddress';
import SaveDataInDB from '../jobs/SaveDataInDB';

import Queue from '../../lib/Queue';

class MakeIncidentController {
  async index(req, res) {
    return res.json({ message: 'HelloWorld' });
  }

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
      }); //valida req.body

      // endereco: yup.object().shape({
      //     logradouro: yup.string().required(),
      //     bairro: yup.string(),
      //     cidade: yup.string().required(),
      //     estado: yup.string().required(),
      //     pais: yup.string().required(),
      //     cep: yup.string().required(),
      //   }),

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          error: 'Validation fails',
        });
      }

      const { latitude, longitude, denunciante, denuncia } = req.body;
      const address = { latitude, longitude };

      const getAddressQueue = await Queue.add(getAddressJob.key, {
        address,
      });

      getAddressQueue.on('succeeded', async (data) => {
        let endereco = JSON.parse(data);
        console.log(endereco);
        if (!endereco) {
          const setAddressQueue = await Queue.add(setAddressJob.key, {
            address,
          });

          setAddressQueue.on('succeeded', async (data) => {
            endereco = JSON.parse(data);
            console.log('enderecoSet', endereco);
            const dataSaveDB = await Queue.add(SaveDataInDB.key, {
              latitude,
              longitude,
              denunciante,
              denuncia,
              endereco,
            });
            dataSaveDB.on('succeeded', (dataJson) => {
              const data = JSON.parse(dataJson);
              console.log('data', data);
              return res.json({ data });
            });
          });
        } else {
          console.log('enderecoGet', endereco);

          const dataSaveDB = await Queue.add(SaveDataInDB.key, {
            latitude,
            longitude,
            denunciante,
            denuncia,
            endereco,
          });
          dataSaveDB.on('succeeded', (dataJson) => {
            const data = JSON.parse(dataJson);
            console.log('data', data);
            return res.json({ data });
          });
        }
      });

      // try {
      //   const connection = new PrismaClient();
      //   let data = await connection.incidentUsers.create({
      //     data: {
      //       latitude,
      //       longitude,
      //       User: {
      //         create: denunciante,
      //       },
      //       Incident: {
      //         create: denuncia,
      //       },
      //       Address: {
      //         create: endereco,
      //       },
      //     },

      //     select: {
      //       id: true,
      //       latitude: true,
      //       longitude: true,
      //       User: {
      //         select: {
      //           nome: true,
      //           cpf: true,
      //         },
      //       },
      //       Incident: {
      //         select: {
      //           titulo: true,
      //           descricao: true,
      //         },
      //       },
      //       Address: {
      //         select: {
      //           logradouro: true,
      //           bairro: true,
      //           cidade: true,
      //           estado: true,
      //           pais: true,
      //           cep: true,
      //         },
      //       },
      //     },
      //   });

      //   const {
      //     id,
      //     latitude: latDenuncia,
      //     longitude: longDenuncia,
      //     User,
      //     Incident,
      //     Address,
      //   } = data;

      //   data = {
      //     id,
      //     latitude: latDenuncia,
      //     longitude: longDenuncia,
      //     denunciante: User,
      //     denuncia: Incident,
      //     endereco: Address,
      //   };

      // return res.json({ data: null });
      // } catch (err) {
      //   console.log('err', err);
      //   return res.json({ err });
      // }
    } catch (err) {
      return res.json({ err });
    }
  }
}

export default new MakeIncidentController();
