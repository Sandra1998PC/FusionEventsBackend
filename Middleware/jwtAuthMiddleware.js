const jwt = require("jsonwebtoken")

const jwtAuthMiddleware = (req, res, next) => {
    console.log(`Inside JWT Auth Middleware`);

    const token = req.headers["authorization"].split(" ")[1]
    console.log(token);

    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.secretKey)

            console.log("JWT Response:", jwtResponse)
            console.log("email:", jwtResponse.email)
            console.log("id:", jwtResponse.id)

            req.payload = jwtResponse.email
            req.userId = jwtResponse.id
            next()
        } catch (error) {
            res.status(401).json(`Authorization Failed... Token Missing!!!`)
        }
    }
}

module.exports = jwtAuthMiddleware