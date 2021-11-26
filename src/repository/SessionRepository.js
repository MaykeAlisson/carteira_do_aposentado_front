import isEmpty from "../infra/util/isEmpty";

const KEY = 'carteiraAp-session';

class SessionRepository {

    static set(value) {

        localStorage.setItem(KEY, value);
    }

    static get() {

        const possivelUser = localStorage.getItem(KEY);

        return possivelUser === 'null' ? {} : possivelUser ;
    }

    static delete() {

        return localStorage.removeItem(KEY);
    }


    static clear() {
        localStorage.clear();
    }

}

export default SessionRepository;
