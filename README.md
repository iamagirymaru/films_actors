# Films with actors

## Реализовано:
1. Rest api сущности film и actor согласно требованиям задачи.
2. Регистрация и авторизация пользователя.

## Запуск проекта
1. `npm run start`
---
## Возможные улучшения
1. Добавить валидацию данных, на уровне обращения к базе и внешних запросов.
2. Сделать авторизацию на основе работы с токеном
3. Ввести единую, более понятную и четкую систему префиксов.
---
## Дополнительно
* Авторизация сделана упрощенным образом, так как в предоставленных сущностях не было возможности отдавать поле с токеном.
* Также вызвало вопросы, почему в задании в сущности ответов на запросы актеров, поле `id` имеет тип `string`, вероятно это опечатка.
---
## Эндпоиты 
* GET `http://localhost:3013/api/films`
* GET `http://localhost:3013/api/film/:filmId`
* POST `http://localhost:3013/api/film`
* PATCH `http://localhost:3013/api/film/:filmId`
* DELETE `http://localhost:3013/api/film/:filmId`

* GET `http://localhost:3013/api/actors`
* GET `http://localhost:3013/api/actor/:actorId`
* POST `http://localhost:3013/api/actor`
* PATCH `http://localhost:3013/api/actor/:actorId`
* DELETE `http://localhost:3013/api/actor/:actorId`

* POST `http://localhost:3013/api/register`
* POST `http://localhost:3013/api/auth`
