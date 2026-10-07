import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidate } from './validation/auth.js';
import { loginValidate } from './validation/login.js';
import { articleCreateValidate } from './validation/article.js';
import checkAuth from './utils/checkAuth.js';
import { error } from 'console';
import { register, login, checkUser, forgotPassword, resetPassword, deletePerson } from './controllers/UserController.js';
import { create, getAll, getOne, remove, update } from './controllers/ArticleController.js';
import { getAllPlaces, getCategoryPlaces, upgradePlaces} from './controllers/SortPlacesController.js'
import handleValidationErrors from './utils/handleValidationErrors.js';
import cors from 'cors'


mongoose.connect(
    `mongodb+srv://pashakompasha:FMYHCLz90bkURvR4@cluster0.qvdtkg7.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log("DB connected!"))
    .catch((err) => console.log("DB not connected " + err));

const app = express(); //

const storage = multer.diskStorage({
    destination: (a, b, cb) => {
        cb(null, 'uploads');
    },
    filename: (a, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.post('/auth/register', registerValidate, handleValidationErrors, register);
app.post('/auth/login', loginValidate, handleValidationErrors, login);
app.get('/auth/me', checkAuth, checkUser);
app.post('/auth/forgot-password', forgotPassword);
app.post('/auth/reset-password/:id/:token', resetPassword);
app.delete('/auth/delete-account', checkAuth, deletePerson);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.get('/articles', getAll);
app.get('/articles/:id', getOne);
app.post('/articles', checkAuth, articleCreateValidate, handleValidationErrors, create);
app.delete('/articles/:id', checkAuth, remove);
app.patch('/articles/:id', checkAuth, articleCreateValidate, handleValidationErrors, update);

app.get('/sort-places', getAllPlaces);
app.get('/sort-places/:category', getCategoryPlaces);
app.post('/sort-places', upgradePlaces)

app.listen(4444, (err) => {
    if (err) {
        return console.log("Error");
    } 
    console.log("App is working!");
});












/*
app.post('/auth/login', (req, res) => {
    console.log(req.body);
    const token = jwt.sign({
        email: req.body.email,
        fillName: `Твоє Ім'я`,
    }, 'secret123',
    );



    res.json({
        success: "true",
        token,
    });
})
*/

/*
    const anyErrors = validationResult(req);
    if (!anyErrors.isEmpty()) {
        return res.status(400).json(anyErrors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    });

    const user = await doc.save();

    res.json(user);
 */



/*
    try {
        const user = await UserModel.findById(req.userId); 
        if(!user) {
            return res.status(404).json({
                message: "Користувач не знайдений!"
            });
        }
        const { passwordHash, ...userData} =  user._doc;

        res.json(...userData);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Доступ відсутній!"
        })
    }
*/




