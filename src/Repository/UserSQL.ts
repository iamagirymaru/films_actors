import { db } from '../data-source';
import { User, UserI } from '../Entities/UserE';

export class UserSQL {
    // =============================
    //            SELECT
    // =============================
    
    /**
     * Получить пользователя по параметрам
     */
    public async oneByParams(data: Partial<UserI>): Promise<UserI> {
        let res: UserI = null;

        try {
            res = await db
                .getRepository(User)
                .createQueryBuilder()
                .where(data)
                .getOne();
        } catch (e) {
            console.log('UserSQL',e);
        }

        return res;
    }

    // =============================
    //            INSERT
    // =============================

    /**
     * Создать пользователя
     */
    public async insert(data: Partial<UserI>): Promise<number> {
        let res = 0;

        try {
            res = Number((await db
                .createQueryBuilder()
                .insert()
                .into(User)
                .values(data)
                .execute()).raw);

        } catch (e) {
            console.log('UserSQL',e);
        }

        return res;
    }

    // =============================
    //            UPDATE
    // =============================
    // =============================
    //            DELETE
    // =============================

}