module.exports = {
    "mongodb": {
        "hostname": process.env.MONGODB_HOST || "0.0.0.0",
        "port": process.env.MONGODB_PORT || 27017,
        "database": process.env.MONGODB_DATABASE_NAME || "tamarin",
        "password": process.env.MONGODB_PASSWORD || "",
        "user": process.env.MONGODB_USERNAME || ""
    }
};