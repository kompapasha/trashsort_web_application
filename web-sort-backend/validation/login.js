import { body } from 'express-validator';

const loginValidate = [
    body('email', "Не правильний формат електронної пошти!").isEmail(),
    body('password', "Пароль містить мінімум 5 символів").isLength({ min: 5 }),
];

export { loginValidate };