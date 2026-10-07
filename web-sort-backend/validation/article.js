import { body } from 'express-validator';

const articleCreateValidate = [
    body('title', "Введіть заголовок статті!").isLength({ min: 3}).isString(),
    body('text', "Введіть текст статті!").isLength({ min: 10}).isString(),
    body('imageUrl', "Введіть текст статті!").optional().isString(),
];

export { articleCreateValidate };

//body('tags', "Введіть текст статті!").isLength({ min: 10}).isString(),



