
// const JWT_SECRET = 'your_jwt_secret'; 

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token'); // header is the part of req and res that contain additional info about user
    if (!token) {
        req.status(401).send({ error: "authenticate using avalid token " })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user; // assigning decoded to the req.user data.user is the payload
        next(); // Pass control to the next middleware or route handler async function
    } catch (error) {
        req.status(401).send({ error: "authenticate using avalid token " })
    }
    
}
module.exports = fetchuser;