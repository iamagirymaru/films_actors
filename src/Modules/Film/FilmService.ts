import _ from 'lodash';

import { FilmRouter as Router } from './FilmRouter';
import { FilmSQL } from '../../Repository/FilmSQL';
import { ActorSQL } from '../../Repository/ActorSQL';

/**
 * Сервис по работе с фильмами
 */
export class FilmService {
    private filmSQL: FilmSQL;
    private actorSQL: ActorSQL;

    constructor() {
        this.filmSQL = new FilmSQL;
        this.actorSQL = new ActorSQL;
    }

    /**
     * Получить все фильмы
     */
    public async getAllFilms(data: Router.getAllFilms.RequestI): Promise<Router.getAllFilms.ResponseI[]> {
        const aFilmWithActors = await this.filmSQL.listWithActors();

        return aFilmWithActors;
    };
    
    /**
     * Получить фильм по id
     */
    public async getFilmByID(data: Router.getFilmByID.RequestI): Promise<Router.getFilmByID.ResponseI> {
        const filmWithActors = await this.filmSQL.oneByParamsWithActors({ id: data.film_id });

        return filmWithActors;
    };

    /**
     * Добавить фильм 
     */
    public async newFilm(data: Router.newFilm.RequestI): Promise<Router.newFilm.ResponseI> {
        const film = await this.filmSQL.oneByParams({ name: data.name });
        if (film) {
            throw 'Фильм с таким названием уже существует';
        }

        const aActor = await this.actorSQL.listByListID(data.actors);

        // Проверка на существование всех актеров
        const ixActor = _.keyBy(aActor, 'id');
        for (const idActor of data.actors) {
            if (!ixActor[idActor]) {
                throw `Актер с ID: ${idActor} не найден в базе`;
            }
        }

        // Добавляем фильм
        const idFilm = await this.filmSQL.insert({ name: data.name });
        // Добавляем актеров к фильму
        await this.filmSQL.addActorsToFilm(idFilm, data.actors);

        const newFilm = await this.filmSQL.oneByParamsWithActors({ id: idFilm });

        return newFilm;
    };
    
    /**
     * Обновить фильм по id
     */
    public async updateFilmByID(data: Router.updateFilmByID.RequestI): Promise<Router.updateFilmByID.ResponseI> {
        let film = await this.filmSQL.oneByParams({ id: data.film_id });
        if (!film) {
            throw 'Фильм не найден';
        }

        // Проверка на существование всех актеров
        if (data.actors?.length) {
            const aActor = await this.actorSQL.listByListID(data.actors);

            const ixActor = _.keyBy(aActor, 'id');
            for (const idActor of data.actors) {
                if (!ixActor[idActor]) {
                    throw `Актер с ID: ${idActor} не найден в базе`;
                }
            }
        }

        if (data.actors) {
            await this.filmSQL.updateFilmActorsByID(data.film_id, data.actors);
        }

        if (data.name) {
            await this.filmSQL.updateByID(data.film_id, { name: data.name });
        }
       
        const updatedFilm = await this.filmSQL.oneByParamsWithActors({ id: data.film_id });

        return updatedFilm;
    };

    /**Удалить фильм по id */
    public async delFilmByID(data: Router.delFilmByID.RequestI): Promise<Router.delFilmByID.ResponseI> {
        await this.filmSQL.delByID(data.film_id);

        return {};
    };
}