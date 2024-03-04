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
        let aActor = await this.actorSQL.list();
        const aActorRes = aActor.map(actor => ({
            id: actor.id.toString(),
            name: actor.name,
        }));

        return aActorRes;
    };
    
    /**
     * Получить актера по id
     */
    public async getActorByID(data: Router.getActorByID.RequestI): Promise<Router.getActorByID.ResponseI> {
        const actor = await this.actorSQL.oneByParams({ id: data.actor_id });
        const actorRes = {
            id: actor.id.toString(),
            name: actor.name,
        }

        return actorRes;
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

        const actorRes = {
            id: actor.id.toString(),
            name: actor.name,
        }

        return actorRes;
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

        const actorRes = {
            id: actor.id.toString(),
            name: actor.name,
        }

        return actorRes;
    };

    /**
     * Удалить актера по id
     */
    public async delActorByID(data: Router.delActorByID.RequestI): Promise<Router.delActorByID.ResponseI> {
        await this.actorSQL.delByID(data.actor_id);

        return {};
    };
}