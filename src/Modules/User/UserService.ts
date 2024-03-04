import { UserRouter as Router } from './UserRouter';
import { UserSQL } from '../../Repository/UserSQL';

/**
 * Сервис по работе с пользователем
 */
export class UserService {
    private userSQL: UserSQL;

    constructor() {
        this.userSQL = new UserSQL;
    }

    /**
     * Регистрация пользователя
     */
    public async register(data: Router.register.RequestI): Promise<Router.register.ResponseI> {
        const user = await this.userSQL.oneByParams({ email: data.email });

        let isRegisterResult = false;
        if (!user) { // Создаем пользователя
            const idUser = await this.userSQL.insert(data);
            if (idUser > 0) {
                isRegisterResult = true;
            }
            
        } else {
            console.log(`Пользователь с почтой ${data.email} уже существует`);
        }

        return { success: isRegisterResult };
    };
    
    /**
     * Авторизация пользователя
     */
    public async auth(data: Router.auth.RequestI): Promise<Router.auth.ResponseI> {
        const user = await this.userSQL.oneByParams({
            email: data.email,
            password: data.password
        });

        if (!user) {
            throw 'Неверный логин или пароль';
        }
       
        return {};
    };
}