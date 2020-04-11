import * as yup from 'yup';

import User from '../models/User';
import Incident from '../models/Incident';
import Address from '../models/Address';
import DenunciationsIncident from '../models/DenunciationsIncident';

class MakeIncidentController {
  async index(req, res) {
    return res.json({ message: 'HelloWorld' });
  }

  async store(req, res) {
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
      endereco: yup.object().shape({
        logradouro: yup.string().required(),
        bairro: yup.string(),
        cidade: yup.string().required(),
        estado: yup.string().required(),
        pais: yup.string().required(),
        cep: yup.string().required(),
      }),
    }); //valida req.body

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    let { latitude, longitude, denunciante, denuncia, endereco } = req.body;
    const { nome } = denunciante;
    const { titulo } = denuncia;
    const { logradouro } = endereco;

    const findDenunciante = await User.create(denunciante);
    const findDenuncia = await Incident.create(denuncia);
    const findEndereco = await Address.create(endereco);

    try {
      let { id: idDenuncia } = await DenunciationsIncident.create({
        latitude,
        longitude,
        denunciante: findDenunciante.id,
        denuncia: findDenuncia.id,
        endereco: findEndereco.id,
      });

      const {
        id,
        User: denunciante,
        Incident: denuncia,
        Address: endereco,
      } = await DenunciationsIncident.findOne({
        where: { id: idDenuncia },
        attributes: ['id', 'latitude', 'longitude'],
        include: [
          {
            model: User,

            attributes: ['nome', 'cpf'],
          },
          {
            model: Incident,
            attributes: ['titulo', 'descricao'],
          },
          {
            model: Address,
            attributes: [
              'logradouro',
              'bairro',
              'cidade',
              'estado',
              'pais',
              'cep',
            ],
          },
        ],
      });

      const data = {
        id,
        latitude,
        longitude,
        denunciante,
        denuncia,
        endereco,
      };

      return res.json({ data });
    } catch (err) {
      return res.json({ err });
    }
  }
}

export default new MakeIncidentController();
