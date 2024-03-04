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
        export interface ResponseI extends ActorI {}
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
        export interface ResponseI extends ActorI {}
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
        export interface ResponseI extends ActorI {}
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
        export interface ResponseI extends ActorI {}
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