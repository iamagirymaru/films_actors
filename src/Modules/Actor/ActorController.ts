import express from 'express';

import { ActorRouter as Router } from './ActorRouter';
import { ActorService } from './ActorService';

const router = express.Router();

export class ActorController {
    public actorSerivce: ActorService;

    /**
	 * Инициализация
	 */
    async faInit(): Promise<void> {
        this.actorSerivce = new ActorService();
    }
}

/**
 * Получить всех актеров
 */
router.get(
    Router.getAllActors.route, async (req, res) => {
        const controller = new ActorController();
        await controller.faInit();
    
        try {
            const requestData: Router.getAllActors.RequestI = req.body;
            const responseData: Router.getAllActors.ResponseI[] = await controller.actorSerivce.getAllActors(requestData);
            res.status(200).json(responseData);
        } catch (e) {
            res.status(422).json({ error: "Unprocessable Entity", details: e });
            console.log('ActorController', e);
        }
    }
);

/**
 * Получить актера по id
 */
router.get(
    Router.getActorByID.route, async (req, res) => {
        const controller = new ActorController();
        await controller.faInit();
    
        try {
            const requestData: Router.getActorByID.RequestI = req.body;
            requestData.actor_id = Number(req.params.actorId);

            const responseData: Router.getActorByID.ResponseI = await controller.actorSerivce.getActorByID(requestData);
            res.status(200).json(responseData);
        } catch (e) {
            res.status(422).json({ error: "Unprocessable Entity", details: e });
            console.log('ActorController', e);
        }
    }
);

/**
 * Добавить актера
 */
router.post(
    Router.newActor.route, async (req, res) => {
        const controller = new ActorController();
        await controller.faInit();
    
        try {
            const requestData: Router.newActor.RequestI = req.body;
            const responseData: Router.newActor.ResponseI = await controller.actorSerivce.newActor(requestData);
            res.json(responseData);
        } catch (e) {
            res.status(422).json({ error: "Unprocessable Entity", details: e });
            console.log('ActorController', e);
        }
    }
);

/**
 * Обновить актера по id
 */
router.patch(
    Router.updateActorByID.route, async (req, res) => {
        const controller = new ActorController();
        await controller.faInit();
    
        try {
            const requestData: Router.updateActorByID.RequestI = req.body;
            requestData.actor_id = Number(req.params.actorId);

            const responseData: Router.updateActorByID.ResponseI = await controller.actorSerivce.updateActorByID(requestData);
            res.status(200).json(responseData);
        } catch (e) {
            res.status(422).json({ error: "Unprocessable Entity", details: e });
            console.log('ActorController', e);
        }
    }
);

/**
 * Удалить актера по id
 */
router.delete(
    Router.delActorByID.route, async (req, res) => {
        const controller = new ActorController();
        await controller.faInit();
    
        try {
            const requestData: Router.delActorByID.RequestI = req.body;
            requestData.actor_id = Number(req.params.actorId);

            const responseData: Router.delActorByID.ResponseI = await controller.actorSerivce.delActorByID(requestData);
            res.status(200).json(responseData);
        } catch (e) {
            res.status(422).json({ error: "Unprocessable Entity", details: e });
            console.log('ActorController', e);
        }
    }
);

export { router };