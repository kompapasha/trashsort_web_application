import { body } from 'express-validator';

const registerValidate = [
    body('email', "Не правильний формат електронної пошти!").isEmail(),
    body('password', "Пароль містить мінімум 5 символів").isLength({ min: 5 }),
    body('fullName', "Вкажіть правильне ім'я").isLength({ min: 3 }),
    body('avatarUrl', "Не правильний формат посилання на фото").optional().isURL(),

];

export { registerValidate };