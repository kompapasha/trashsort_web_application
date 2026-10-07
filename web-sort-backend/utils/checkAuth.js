import jwt from 'jsonwebtoken';

export default(req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decodeToken = jwt.verify(token, 'secret123');
            req.userId = decodeToken._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: "Доступ відстуній",
            })
        }
    } else {
        return res.status(403).json({
            message: "Доступ відстуній",
        })
    }
    //res.send(token);
}