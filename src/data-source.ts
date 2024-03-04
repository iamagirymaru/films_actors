import { DataSource } from 'typeorm';

import { User } from './Entities/UserE';
import { Film } from './Entities/FilmE';
import { Actor } from './Entities/ActorE';

export const db = new DataSource({
    type: 'sqlite',
    database: './db.sqlite',
    synchronize: true,
    logging: true,
    entities: [User, Film, Actor],
});