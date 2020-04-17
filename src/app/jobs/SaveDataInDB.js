import { PrismaClient } from '@prisma/client';
import handlers from '../exceptions/handlers';

const { HandlerDatabase, HandlerRedis } = handlers;

class SaveDataInDB {
  get key() {
    return 'SaveDataInDB';
  }

  async handle({ data }) {
    try {
      const { latitude, longitude, denunciante, denuncia, endereco } = data;

      try {
        const connection = new PrismaClient();
        let data = await connection.incidentUsers.create({
          data: {
            latitude,
            longitude,
            User: {
              create: denunciante,
            },
            Incident: {
              create: denuncia,
            },
            Address: {
              create:
                typeof endereco !== 'string' ? endereco : JSON.parse(endereco),
            },
          },

          select: {
            id: true,
            latitude: true,
            longitude: true,
            User: {
              select: {
                nome: true,
                cpf: true,
              },
            },
            Incident: {
              select: {
                titulo: true,
                descricao: true,
              },
            },
            Address: {
              select: {
                logradouro: true,
                bairro: true,
                cidade: true,
                estado: true,
                pais: true,
                cep: true,
              },
            },
          },
        });

        const {
          id,
          latitude: latDenuncia,
          longitude: longDenuncia,
          User,
          Incident,
          Address,
        } = data;

        data = {
          id,
          latitude: latDenuncia,
          longitude: longDenuncia,
          denunciante: User,
          denuncia: Incident,
          endereco: Address,
        };
        return JSON.stringify(data);
      } catch (err) {
        const { error } = HandlerDatabase;
        return JSON.stringify(error);
      }
    } catch (err) {
      const { error } = HandlerRedis;
      return JSON.stringify(error);
    }

    console.log('SaveData ', endereco);
  }
}

export default new SaveDataInDB();
