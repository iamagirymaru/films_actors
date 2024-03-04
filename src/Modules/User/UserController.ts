import express from 'express';

import { UserRouter as Router } from './UserRouter';
import { UserService } from './UserService';

const router = express.Router();

export class UserController {
    public userService: UserService;

    /**
	 * Инициализация
	 */
    async faInit(): Promise<void> {
        this.userService = new UserService();
    }
}

/**
 * Регистрация пользователя
 */
router.post(
    Router.register.route, async (req, res) => {
        const controller = new UserController();
        await controller.faInit();
    
        try {
            const requestData: Router.register.RequestI = req.body;
            const responseData: Router.register.ResponseI = await controller.userService.register(requestData);
            res.json(responseData);
        } catch (e) {
            console.log('UserController', e);
            res.status(422).json({ error: "Unprocessable Entity", details: e });
        }
    }
);

/**
 * Авторизация пользователя
 */
router.post(
    Router.auth.route, async (req, res) => {
        const controller = new UserController();
        await controller.faInit();
    
        try {
            const requestData: Router.auth.RequestI = req.body;
            const responseData: Router.auth.ResponseI = await controller.userService.auth(requestData);
            res.status(200).json(responseData);
        } catch (e) {
            console.log('UserController', e);
            res.status(401).json({ error: "Unauthorized", details: e });
        }
    }
);

export { router };