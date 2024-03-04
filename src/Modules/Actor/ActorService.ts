import { ActorRouter as Router } from './ActorRouter';
import { ActorSQL } from '../../Repository/ActorSQL';

/**
 * Сервис по работе с актерами
 */
export class ActorService {
    private actorSQL: ActorSQL;

    constructor() {
        this.actorSQL = new ActorSQL;
    }

    /**
     * Получить всех актеров
     */
    public async getAllActors(data: Router.getAllActors.RequestI): Promise<Router.getAllActors.ResponseI[]> {
        const aActor = await this.actorSQL.list();

        return aActor;
    };
    
    /**
     * Получить актера по id
     */
    public async getActorByID(data: Router.getActorByID.RequestI): Promise<Router.getActorByID.ResponseI> {
        const actor = await this.actorSQL.oneByParams({ id: data.actor_id });

        return actor;
    };

    /**
     * Добавить актера
     */
    public async newActor(data: Router.newActor.RequestI): Promise<Router.newActor.ResponseI> {
        // TODO Если имена актеров должны быт уникальными
        // const actor = await this.actorSQL.oneByParams({ name: data.name });
        // if (actor) {
        //     throw 'Актер с таким именем уже существует';
        // }

        const idActor = await this.actorSQL.insert({ name: data.name });
        const actor = await this.actorSQL.oneByParams({ id: idActor });

        return actor;
    };
    
    /**
     * Обновить актера по id
     */
    public async updateActorByID(data: Router.updateActorByID.RequestI): Promise<Router.updateActorByID.ResponseI> {
        let actor = await this.actorSQL.oneByParams({ id: data.actor_id });
        if (!actor) {
            throw 'Актер не найден';
        }

        await this.actorSQL.updateByID(data.actor_id, { name: data.name });

        actor = await this.actorSQL.oneByParams({ id: data.actor_id });

        return actor;
    };

    /**
     * Удалить актера по id
     */
    public async delActorByID(data: Router.delActorByID.RequestI): Promise<Router.delActorByID.ResponseI> {
        await this.actorSQL.delByID(data.actor_id);

        return {};
    };
}