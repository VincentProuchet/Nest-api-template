/* eslint-disable */
export default async () => {
  const t = {
    ['./user/dto/user-get.dto']: await import('./user/dto/user-get.dto'),
    ['./user/dto/user-update.dto']: await import('./user/dto/user-update.dto'),
    ['./authentication/dto/access-token.dto']: await import(
      './authentication/dto/access-token.dto'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./authentication/dto/register.dto'),
          {
            RegisterDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String, minLength: 10 },
            },
          },
        ],
        [
          import('./user/dto/user-get.dto'),
          {
            UserGetDto: {
              id: { required: true, type: () => Number },
              email: { required: true, type: () => String },
              firstname: { required: true, type: () => String },
              lastname: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./user/entities/user.entity'),
          {
            UserEntity: {
              id: { required: true, type: () => Number },
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
              firstname: { required: true, type: () => String },
              lastname: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./user/dto/user-auth.dto'),
          {
            UserAuthDto: {
              id: { required: true, type: () => Number },
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./user/dto/user-update.dto'),
          {
            UserUpdateDto: {
              id: { required: true, type: () => Number, minimum: 1 },
              email: { required: true, type: () => String },
              firstname: { required: true, type: () => String },
              lastname: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./common/dto/string-email.dto'),
          { StringEmailDto: { email: { required: true, type: () => String } } },
        ],
        [
          import('./authentication/dto/login.dto'),
          {
            LoginDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./authentication/dto/access-token.dto'),
          {
            AccessTokenDto: {
              accessToken: { required: true, type: () => String },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./app.controller'),
          { AppController: { getHello: { type: String } } },
        ],
        [
          import('./user/user.controller'),
          {
            UserController: {
              findAll: { type: [t['./user/dto/user-get.dto'].UserGetDto] },
              findById: { type: Object },
              findByEmail: { type: Object },
              update: { type: t['./user/dto/user-update.dto'].UserUpdateDto },
            },
          },
        ],
        [
          import('./authentication/authentication.controller'),
          {
            AuthenticationController: {
              signUp: { type: t['./user/dto/user-get.dto'].UserGetDto },
              signIn: {
                type: t['./authentication/dto/access-token.dto'].AccessTokenDto,
              },
            },
          },
        ],
      ],
    },
  };
};
