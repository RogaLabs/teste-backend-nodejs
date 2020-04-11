import * as yup from 'yup';


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


    
      return res.json({ data:null });
    } catch (err) {
      return res.json({ err });
    }
  }
}

export default new MakeIncidentController();
