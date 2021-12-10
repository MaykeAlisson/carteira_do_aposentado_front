import axios from 'axios';
import TokenRepository from 'Repository/TokenRepository';
import SessionRepository from 'Repository/SessionRepository';

const baseURL = () => {
    if (process.env.NODE_ENV === 'production') return 'https://cdn01.app.com.br';
    const os = require('os');
    return `http://${os.hostname()}:6030`;
};

const clientHttp = axios.create({
    baseURL: baseURL(),
    mode: 'cors',
    withCredentials: false,
});

clientHttp.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${TokenRepository.get()}`;
        return config;
    },

    (error) => Promise.reject(error),
);

const NO_CONTENT = 204;
const UNAUTHORIZED = 403;

clientHttp.interceptors.response.use(
    (response) => {
        if (response.status === NO_CONTENT) return undefined;
        return response.data;
    },

    (error) => {
        let erro = {
            stack: '',
            message: 'Sistema indisponível no momento - Tente mais tarde',
        };

        console.log(`clientHttp.interceptors.response onRejected`)
        console.log(JSON.stringify(error))
        console.log(JSON.stringify(error.response))

        if (error.response) {
            const {data} = error.response;


            if (error.response.status === UNAUTHORIZED) {
                erro = {
                    stack: error.request.responseURL,
                    message: 'Falhou autenticacao',
                };
                TokenRepository.clear();
                SessionRepository.clear();
                setTimeout(() => {
                    window.location = '/';
                }, 5000);
            }

            erro = {
                stack: error.request.responseURL,
                message: data.message,
            };

        } else {
            TokenRepository.clear();
            SessionRepository.clear();
            setTimeout(() => {
                window.location = '/';
            }, 5000);
        }
        return Promise.reject(erro);
    },
);

export default clientHttp;
