const KEY = 'carteiraAp-session';

class SessionRepository {

    static set(value) {

        localStorage.setItem(KEY, value);
    }

    static get() {

        return localStorage.getItem(KEY);
    }

    static delete() {

        return localStorage.removeItem(KEY);
    }


    static clear() {
        localStorage.clear();
    }

}

export default SessionRepository;
