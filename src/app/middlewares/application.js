import handlers from '../exceptions/handlers';
const { HandlerData } = handlers;

export default async (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    const { error } = HandlerData;
    return res.status(400).send({ error }); // Bad request
  }
  next();
};
