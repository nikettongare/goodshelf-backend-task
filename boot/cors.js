const cors = require("cors");

module.exports = (app) => {
    const corsOptions = {
        credentials: true,
        origin: true,
        allowedHeaders:
            "Accept, Origin, X-Requested-With, x-auth-token, X-Auth-Token, Authorization, Content-Type, content-type, Cache-Control, Access-Control-Allow-Origin",
    };

    app.use(cors(corsOptions));
};
