import Joi from 'joi';

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30),
  }),
};

export default { login };
