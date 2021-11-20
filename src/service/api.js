import http from './clientHttp';

const urlSeguranca = '/api/seguranca/v1/login';

export const Api = {

    Seguranca: {

        login: (email, senha) => {
            return http.post(urlSeguranca, { email, senha });
        },

    },

};
