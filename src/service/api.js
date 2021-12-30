import http from './clientHttp';

const urlSeguranca = '/api/seguranca/v1/login';
const urlUsuario = '/api/users/v1/user';
const urlAtivo = '/api/ativos/v1/ativo';
const urlAtivoConstantes = '/api/ativos/v1/constantes';
const urlFundamento = '/api/fundamentos';
const urlCarteira = '/api/carteira';
const urlLancamento = '/api/lancamento';

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

        findById: (id) => {
            return http.get(`${urlAtivo}/${id}`);
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

    Fundamento: {

        create: (id, dados) => {
            return http.post(`${urlFundamento}/v1/${id}/fundamento`, dados);
        },

    },

    Carteira: {

        create: (dados) => {
            return http.post(`${urlCarteira}/v1/carteira`, dados);
        },

        buscar: () => {
            return http.get(`${urlCarteira}/v1/carteira`);
        },
    },

    Lancamento: {

        create: (dados) => {
            return http.post(`${urlLancamento}/v1/lancamento`, dados);
        },

        buscar: () => {
            return http.get(`${urlLancamento}/v1/lancamento`);
        },
    },

};
