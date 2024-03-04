export namespace UserRouter {
    /**
	 * Регистрация
	 */
    export namespace register {
        /** APIURL */
        export const route = '/register';
       
        /** Параметры api запроса */
        export interface RequestI {
            username: string,
            email: string,
            password: string,
        }

        /** Параметры api ответа */
        export interface ResponseI {
            success: boolean,
        }
    }

    /**
	 * Авторизация
	 */
    export namespace auth {
        /** APIURL */
        export const route = '/auth';
       
        /** Параметры api запроса */
        export interface RequestI {
            email: string,
            password: string
        }

        /** Параметры api ответа */
        export interface ResponseI {
            // нет ответа
        }
    }
}