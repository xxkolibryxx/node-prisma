import Joi from 'joi'

export default {
  getUserByIdSchema: {
    params: Joi.object({
      UserId: Joi.number().integer().required(),
    }),
  },
  createUsersSchema: {
    body: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        roleId: Joi.number().integer().required(),
        companyId: Joi.number().integer().required(),
      })
    ),
  },
}
