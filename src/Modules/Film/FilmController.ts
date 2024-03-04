import express from 'express';

import { FilmRouter as Router } from './FilmRouter';
import { FilmService } from './FilmService';

const router = express.Router();

export class FilmController {
    public filmService: FilmService;

    /**
	 * Инициализация
	 */
    async faInit(): Promise<void> {
        this.filmService = new FilmService();
    }
}

/**
 * Получить все фильмы
 */
router.get(
    Router.getAllFilms.route, async (req, res) => {
        const controller = new FilmController();
        await controller.faInit();
    
        try {
            const requestData: Router.getAllFilms.RequestI = req.body;
            const responseData: Router.getAllFilms.ResponseI[] = await controller.filmService.getAllFilms(requestData);
            res.status(200).json(responseData);
        } catch (e) {
            res.status(422).json({ error: "Unprocessable Entity", details: e });
            console.log('FilmController', e);
        }
    }
);

/**
 * Получить фильм по id
 */
router.get(
    Router.getFilmByID.route, async (req, res) => {
        const controller = new FilmController();
        await controller.faInit();
    
        try {
            const requestData: Router.getFilmByID.RequestI = req.body;
            requestData.film_id = Number(req.params.filmId);

            const responseData: Router.getFilmByID.ResponseI = await controller.filmService.getFilmByID(requestData);
            res.status(200).json(responseData);
        } catch (e) {
            res.status(422).json({ error: "Unprocessable Entity", details: e });
            console.log('FilmController', e);
        }
    }
);

/**
 * Добавить фильм
 */
router.post(
    Router.newFilm.route, async (req, res) => {
        const controller = new FilmController();
        await controller.faInit();
    
        try {
            const requestData: Router.newFilm.RequestI = req.body;
            const responseData: Router.newFilm.ResponseI = await controller.filmService.newFilm(requestData);
            res.json(responseData);
        } catch (e) {
            res.status(422).json({ error: "Unprocessable Entity", details: e });
            console.log('FilmController', e);
        }
    }
);

/**
 * Обновить фильм по id
 */
router.patch(
    Router.updateFilmByID.route, async (req, res) => {
        const controller = new FilmController();
        await controller.faInit();
    
        try {
            const requestData: Router.updateFilmByID.RequestI = req.body;
            requestData.film_id = Number(req.params.filmId);

            const responseData: Router.updateFilmByID.ResponseI = await controller.filmService.updateFilmByID(requestData);
            res.status(200).json(responseData);
        } catch (e) {
            res.status(422).json({ error: "Unprocessable Entity", details: e });
            console.log('FilmController', e);
        }
    }
);

/**
 * Удалить фильм по id
 */
router.delete(
    Router.delFilmByID.route, async (req, res) => {
        const controller = new FilmController();
        await controller.faInit();
    
        try {
            const requestData: Router.delFilmByID.RequestI = req.body;
            requestData.film_id = Number(req.params.filmId);

            const responseData: Router.delFilmByID.ResponseI = await controller.filmService.delFilmByID(requestData);
            res.status(200).json(responseData);
        } catch (e) {
            res.status(422).json({ error: "Unprocessable Entity", details: e });
            console.log('FilmController', e);
        }
    }
);

export { router };