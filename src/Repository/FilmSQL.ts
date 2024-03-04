import { db } from '../data-source';
import { Film, FilmActorsInfoI, FilmI } from '../Entities/FilmE';

export class FilmSQL {
    // =============================
    //            SELECT
    // =============================

    /**
     * Получить фильм по параметрам
     */
    public async oneByParams(data: Partial<FilmI>): Promise<FilmI> {
        let res: FilmI = null;

        try {
            res = await db
                .getRepository(Film)
                .createQueryBuilder()
                .where(data)
                .getOne();
        } catch (e) {
            console.log('FilmSQL', e);
        }

        return res;
    }

    /**
     * Получить фильм по параметрам c актерами
     */
    public async oneByParamsWithActors(data: Partial<FilmI>): Promise<FilmActorsInfoI> {
        let res: FilmActorsInfoI = null;

        try {
            res = await db
                .getRepository(Film)
                .createQueryBuilder()
                .leftJoinAndSelect('Film.actors', 'actor')
                .where(data)
                .getOne();
        } catch (e) {
            console.log('FilmSQL', e);
        }

        return res;
    }

    /**
     * Получить список всех фильмов
     */
    public async list(): Promise<FilmI[]> {
        let res: FilmI[] = [];

        try {
            res = await db
                .getRepository(Film)
                .createQueryBuilder()
                .getMany();
        } catch (e) {
            console.log('FilmSQL', e);
        }

        return res;
    }

    /**
     * Получить список всех фильмов с актерами
     */
    public async listWithActors(): Promise<FilmActorsInfoI[]> {
        let res: FilmActorsInfoI[] = [];

        try {
            res = await db
                .getRepository(Film)
                .createQueryBuilder()
                .leftJoinAndSelect('Film.actors', 'actor')
                .getMany();
        } catch (e) {
            console.log('FilmSQL', e);
        }

        return res;
    }

    // =============================
    //            INSERT
    // =============================

    /**
     * Создать фильм
     */
    public async insert(data: Partial<FilmI>): Promise<number> {
        let res = 0;

        try {
            res = Number((await db
                .createQueryBuilder()
                .insert()
                .into(Film)
                .values(data)
                .execute()).raw);

        } catch (e) {
            console.log('FilmSQL', e);
        }

        return res;
    }

    /**
     * Добавить актров к фильму
     */
    public async addActorsToFilm(idFilm: number, aidActor: number[]): Promise<any> {
        let res = null;

        try {
            res = await db
                .createQueryBuilder()
                .relation(Film, 'actors')
                .of(idFilm)
                .add(aidActor);
            
        } catch (e) {
            console.log('FilmSQL', e);
        }

        return idFilm;
    }

    // =============================
    //            UPDATE
    // =============================

    /**
     * Обновить фильм по ID
     */
    public async updateByID(idFilm: number, data: Partial<FilmI>): Promise<any> {
        let res = null;

        try {
            res = await db
                .createQueryBuilder()
                .update(Film)
                .set(data)
                .where({ id: idFilm })
                .execute();

        } catch (e) {
            console.log('FilmSQL', e);
        }

        return res;
    }

    /**
     * Обновить актеров у фильма по ID
     */
    public async updateFilmActorsByID(idFilm: number, aidActor: number[]): Promise<void> {
        try {
            const aActorOld = await db
                .getRepository(Film)
                .createQueryBuilder()
                .leftJoinAndSelect('Film.actors', 'Actor')
                .where('Film.id = :id', { id: idFilm })
                .select('Actor')
                .getRawMany();

            await db
                .createQueryBuilder()
                .relation(Film, 'actors')
                .of(idFilm)
                .remove(aActorOld.map(actor => actor.Actor_id));

            await db
                .createQueryBuilder()
                .relation(Film, 'actors')
                .of(idFilm)
                .add(aidActor);

        } catch (e) {
            console.log('FilmSQL', e);
        }

        return;
    }

    // =============================
    //            DELETE
    // =============================

    /**
     * Удалить фильм по ID
     */
    public async delByID(idFilm: number): Promise<any> {
        let res = null;

        try {
            // Удаляем связи со всеми актерами, которые участвует в этом фильме
            const aActor = await db
                .getRepository(Film)
                .createQueryBuilder()
                .leftJoinAndSelect('Film.actors', 'Actor')
                .where('Film.id = :id', { id: idFilm })
                .select('Actor')
                .getRawMany();

            await db
                .createQueryBuilder()
                .relation(Film, 'actors')
                .of(idFilm)
                .remove(aActor.map(actor => actor.Actor_id));

            res = await db
                .createQueryBuilder()
                .delete()
                .from(Film)
                .where({ id: idFilm })
                .execute();

        } catch (e) {
            console.log('FilmSQL', e);
        }

        return res;
    }  
}