import http from './clientHttp';

const urlSeguranca = '/api/seguranca/v1/login';
const urlUsuario = '/api/users/v1/user';
const urlAtivo = '/api/ativos/v1/ativo';

export const Api = {

    Seguranca: {

        login: (email, senha) => {
            return http.post(urlSeguranca, { email, senha });
        },

    },

    Usuario: {

        cadastro: (dados) => {
            return http.post(urlUsuario, dados);
        },

    },

    Ativo: {

        cadastro: (dados) => {
            return http.post(urlAtivo, dados);
        },

    },

};
