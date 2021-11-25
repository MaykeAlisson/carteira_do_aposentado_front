import http from './clientHttp';

const urlSeguranca = '/api/seguranca/v1/login';
const urlUsuario = '/api/users/v1/user';

export const Api = {

    Seguranca: {

        login: (email, senha) => {
            return http.post(urlSeguranca, { email, senha });
        },

    },

    Usuario: {

        cadastro: (dados) => {
            return http.post(urlSeguranca, dados);
        },

    },

};
