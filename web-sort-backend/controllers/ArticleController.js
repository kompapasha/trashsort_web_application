import ArticleModel from '../model/Article.js';

const create = async(req, res) => {
    try {
        const doc = new ArticleModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });
        const article = await doc.save();
        res.json(article);

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалося створити статтю!",
        });
    }
};
const getAll = async(req, res) => {
    try {
        const articles = await ArticleModel.find().populate({ path: "user", select: ["fullName", "avatarUrl"]});   //.populate('user').exec();      
        res.json(articles);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалося отримати статті!",
        });
    }
};
const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await ArticleModel.findOne({ _id: postId }).populate('user').exec();
        if (!doc) {
            return res.status(404).json({
                message: "Стаття не знайдена!",
            });
        }
        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалося отримати статтю!",
        });
    }
};
const remove = async (req, res) => {
    try {
        const postId = req.params.id;     
        const doc = await ArticleModel.findOneAndDelete({ _id: postId });
        if (!doc) {
            return res.status(404).json({
                message: "Стаття не знайдена",
            });
        }
        res.json({
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Не вдалося видалити статтю",
        });
    }
};
const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await ArticleModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        },);

        res.json({
            success: true,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалося оновити статтю!",
        });
    }
}

export { create, getAll, getOne, remove, update }