import { In } from 'typeorm';

import { db } from '../data-source';
import { Actor, ActorI } from '../Entities/ActorE';
import { Film } from '../Entities/FilmE';

export class ActorSQL {
    // =============================
    //            SELECT
    // =============================

    /**
     * Получить актера по параметрам
     */
    public async oneByParams(data: Partial<ActorI>): Promise<ActorI> {
        let res: ActorI = null;

        try {
            res = await db
                .getRepository(Actor)
                .createQueryBuilder()
                .where(data)
                .getOne();
        } catch (e) {
            console.log('ActorSQL', e);
        }

        return res;
    }

    /**
     * Получить список всех актеров
     */
    public async list(): Promise<ActorI[]> {
        let res: ActorI[] = [];

        try {
            res = await db
                .getRepository(Actor)
                .createQueryBuilder()
                .getMany();
        } catch (e) {
            console.log('ActorSQL', e);
        }

        return res;
    }

    /**
     * Получить список актеров по списку их ID
     */
    public async listByListID(aidActor: number[]): Promise<ActorI[]> {
        let res: ActorI[] = [];

        try {
            res = await db
                .getRepository(Actor)
                .createQueryBuilder()
                .whereInIds(aidActor)
                .getMany();
        } catch (e) {
            console.log('ActorSQL', e);
        }

        return res;
    }

    // =============================
    //            INSERT
    // =============================

    /**
     * Создать актера
     */
    public async insert(data: Partial<ActorI>): Promise<number> {
        let res = 0;

        try {
            res = Number((await db
                .createQueryBuilder()
                .insert()
                .into(Actor)
                .values(data)
                .execute()).raw);

        } catch (e) {
            console.log('ActorSQL', e);
        }

        return res;
    }

    // =============================
    //            UPDATE
    // =============================

    /**
     * Обновить актера по ID
     */
    public async updateByID(idActor: number, data: Partial<ActorI>): Promise<any> {
        let res = null;

        try {
            res = await db
                .createQueryBuilder()
                .update(Actor)
                .set(data)
                .where({ id: idActor })
                .execute();

        } catch (e) {
            console.log('ActorSQL', e);
        }

        return res;
    }

    // =============================
    //            DELETE
    // =============================

    /**
     * Удалить актера по ID
     */
    public async delByID(idActor: number): Promise<any> {
        let res = null;

        try {
            // Удаляем связи со всеми фильмами, где учатсвует этот актер
            const aFilm = await db
                .getRepository(Film)
                .createQueryBuilder()
                .leftJoinAndSelect('Film.actors', 'Actor')
                .where('Actor.id = :id', { id: idActor })
                .select('Film')
                .getRawMany();
                console.log(aFilm)

            await db
                .createQueryBuilder()
                .relation(Actor, 'films')
                .of(idActor)
                .remove(aFilm.map(film => film.Film_id));
                
            res = await db
                .createQueryBuilder()
                .delete()
                .from(Actor)
                .where({ id: idActor })
                .execute();

        } catch (e) {
            console.log('ActorSQL', e);
        }

        return res;
    }  
}