import { ActorI } from '../../Entities/ActorE';

export namespace ActorRouter {
    /**
	 * Получить всех актеров
	 */
    export namespace getAllActors {
        /** APIURL */
        export const route = '/actors';
       
        /** Параметры api запроса */
        export interface RequestI {
            // нет запроса
        }

        /** Параметры api ответа */
        export interface ResponseI {
            id: string,
            name: string
        }
    }

    /**
	 * Получить актера по id
	 */
    export namespace getActorByID {
        /** APIURL */
        export const route = '/actor/:actorId';
       
        /** Параметры api запроса */
        export interface RequestI {
            actor_id: number,
        }

        /** Параметры api ответа */
        export interface ResponseI {
            id: string,
            name: string
        }
    }

    /**
	 * Добавить актера
	 */
    export namespace newActor {
        /** APIURL */
        export const route = '/actor';
       
        /** Параметры api запроса */
        export interface RequestI {
           name: string,
        }

        /** Параметры api ответа */
        export interface ResponseI {
            id: string,
            name: string
        }
    }

    /**
	 * Обновить актера по id
	 */
    export namespace updateActorByID {
        /** APIURL */
        export const route = '/actor/:actorId';
       
        /** Параметры api запроса */
        export interface RequestI {
            actor_id: number,
            name: string,
        }

        /** Параметры api ответа */
        export interface ResponseI {
            id: string,
            name: string
        }
    }

    /**
	 * Удалить актера по id
	 */
    export namespace delActorByID {
        /** APIURL */
        export const route = '/actor/:actorId';
       
        /** Параметры api запроса */
        export interface RequestI {
            actor_id: number,
        }

        /** Параметры api ответа */
        export interface ResponseI {
            // нет ответа
        }
    }
}