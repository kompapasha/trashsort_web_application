import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import ArticleModel from '../model/Article.js';
import UserModel from '../model/User.js';
import nodemailer from 'nodemailer';

const register = async(req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt)
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hashed,
        });
        const user = await doc.save();
        
        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d',
        })

        const { passwordHash, ...userData} =  user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Помилка реєстрації!"
        })
    }
}

const login = async(req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if(!user) {
            return res.status(404).json({
                message: "Не вірна пошта або пароль",
            });
        }
        const userValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!userValidPass) {
            return res.status(404).json({
                message: "Не вірна пошта або пароль",
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123', {
            expiresIn: '30d',
        })

        const { passwordHash, ...userData} =  user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Помилка авторизації!"
        })
    }
}

const checkUser = async(req, res) => {
    try {
        const user = await UserModel.findById(req.userId); 
        if(!user) {
            return res.status(404).json({
                message: "Користувач не знайдений!"
            });
        }
        const { passwordHash, ...userData} =  user._doc;
        res.json(userData);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Доступ відсутній!"
        })
    }
}

const forgotPassword = async(req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
    if(!user) {
        return res.status(404).json({
            message: "Не вірна пошта або пароль",
        });
    }
    const token = jwt.sign({
        _id: user._id,
    }, 'secret123', {
        expiresIn: '1d',
    })
    const resetLink = `http://localhost:3000/reset-password/${user._id}/${token}`;
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'pashakompasha@gmail.com',
            pass: 'vayp hqoe uews bkre',
          }
        });
        var mailOptions = {
          from: 'pashakompasha@gmail.com',
          to: user.email,
          subject: 'Reset Password Link',
          text: `Тема: Відновлення пароля для вашого акаунту
          Відправник: KNUWebApp
          До: ${user.email}
          
          Доброго дня, ${user.email}!
          Ви отримали цей лист, тому що ми отримали запит на відновлення пароля для вашого акаунту.
          Будь ласка, перейдіть за наступним посиланням, щоб змінити ваш пароль:
          ${resetLink}
          Це посилання буде дійсне протягом 24 годин. Якщо ви не робили цей запит, будь ласка, проігноруйте цей лист або зв'яжіться з нашою підтримкою.
          Для забезпечення безпеки вашого акаунту, не передавайте це посилання іншим особам.
          Якщо у вас виникли будь-які питання або потрібна допомога, не вагайтеся звернутися до нашої служби підтримки.
          Дякуємо за використання нашого сервісу!
          
          З повагою,
          Команда KNUWebApp
          `
        };
        
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).json({
            message: "Помилка відправки повідомлення!"
        })
        } else {
            res.json({
                success: true,
            });
        }
      });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Помилка відправки повідомлення!"
        })
    }
}

const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    if (!id || !token || !password) {
        return res.status(400).json({
            message: "Всі поля обов'язкові",
        });
    }

    try {
        jwt.verify(token, 'secret123', async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    message: "Помилка з токеном!",
                });
            }

            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const user = await UserModel.findById(id);
                if (!user) {
                    return res.status(404).json({
                        message: "Користувача не знайдено",
                    });
                }

                user.passwordHash = hashedPassword;
                await user.save();

                res.json({
                    success: true,
                });
            } catch (updateError) {
                console.log(updateError);
                res.status(500).json({
                    message: "Помилка оновлення пароля!",
                });
            }
        });
    } catch (verificationError) {
        console.log(verificationError);
        res.status(500).json({
            message: "Помилка валідації токену!",
        });
    }
};

const deletePerson = async(req, res) => {
    try {
        const userId = req.userId;
        await UserModel.findByIdAndDelete(userId);
        await ArticleModel.deleteMany({ user: userId });
        res.status(200).json({ message: 'Користувач та його статті були успішно видалені' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не вдалося видалити користувача' });
    }
}

export {register, login, checkUser, forgotPassword, resetPassword, deletePerson};


//Текст, який написаний хоч якось, точка гих ${resetLink}
/*
const resetPassword = async(req, res) => {
    const {id, token} = req.params;
    const {password} = req.body;
    jwt.verify(token, 'secret123', async(err, decoded) => {
        if(err) {
            console.log(err);
            res.status(500).json({
                message: "Помилка з токеном!"
            })
        } else {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);
                const u = await UserModel.findByIdAndUpdate({_id: id}, {password: hashed});
                res.json({
                    success: true,
                });
            } catch(err) {
                console.log(err);
                res.status(500).json({
                    message: "Помилка оновлення!"
                })
            }
        }
    })
}
*/