import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';

import { db } from './data-source';
import * as UserController from './Modules/User/UserController';
import * as ActorController from './Modules/Actor/ActorController'
import * as FilmController from './Modules/Film/FilmController'

dotenv.config();

// Создаем или подключаемся к файлу базы данных
db.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((e: any) => {
        console.error("Error during Data Source initialization", e)
    })


const app = express();

app.use(compression());
app.use(bodyParser.json());

// Запуск приложения
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  	console.log(`Server running on http://localhost:${process.env.PORT}/`);
});


// =============================
//     ПОДКЛЮЧЕНИЕ МОДУЛЕЙ
// =============================

/** Модуль пользователя */ 
app.use('/api', UserController.router);

/** Модуль актеров */ 
app.use('/api', ActorController.router);

/** Модуль фильмов */ 
app.use('/api', FilmController.router);
