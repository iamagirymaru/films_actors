import { ActorI } from '../../Entities/ActorE';
import { FilmActorsInfoI } from '../../Entities/FilmE';

export namespace FilmRouter {
    /**
	 * Получить все фильмы
	 */
    export namespace getAllFilms {
        /** APIURL */
        export const route = '/films';
       
        /** Параметры api запроса */
        export interface RequestI {
            // нет запроса
        }

        /** Параметры api ответа */
        export interface ResponseI extends FilmActorsInfoI {}
    }

    /**
	 * Получить фильм по id
	 */
    export namespace getFilmByID {
        /** APIURL */
        export const route = '/film/:filmId';
       
        /** Параметры api запроса */
        export interface RequestI {
            film_id: number,
        }

        /** Параметры api ответа */
        export interface ResponseI extends FilmActorsInfoI {}
    }

    /**
	 * Добавить фильм
	 */
    export namespace newFilm {
        /** APIURL */
        export const route = '/film';
       
        /** Параметры api запроса */
        export interface RequestI {
           name: string,
           actors: number[],
        }

        /** Параметры api ответа */
        export interface ResponseI extends FilmActorsInfoI {}
    }

    /**
	 * Обновить фильм по id
	 */
    export namespace updateFilmByID {
        /** APIURL */
        export const route = '/film/:filmId';
       
        /** Параметры api запроса */
        export interface RequestI {
            film_id: number,
            name?: string,
            actors?: number[],
        }

        /** Параметры api ответа */
        export interface ResponseI extends FilmActorsInfoI {}
    }

    /**
	 * Удалить фильм по id
	 */
    export namespace delFilmByID {
        /** APIURL */
        export const route = '/film/:filmId';
       
        /** Параметры api запроса */
        export interface RequestI {
            film_id: number,
        }

        /** Параметры api ответа */
        export interface ResponseI {
            // нет ответа
        }
    }
}