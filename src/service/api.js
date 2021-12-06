import http from './clientHttp';

const urlSeguranca = '/api/seguranca/v1/login';
const urlUsuario = '/api/users/v1/user';
const urlAtivo = '/api/ativos/v1/ativo';
const urlAtivoConstantes = '/api/ativos/v1/constantes';

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

        findAll: () => {
            return http.get(urlAtivo);
        },

        constantes: () => {
            return http.get(urlAtivoConstantes);
        },

        cadastro: (dados) => {
            return http.post(urlAtivo, dados);
        },

        update: (dados) => {
            return http.put(`${urlAtivo}/${dados.id}`, dados);
        },

        delete: (id) => {
            return http.delete(`${urlAtivo}/${id}`);
        },

    },

};
