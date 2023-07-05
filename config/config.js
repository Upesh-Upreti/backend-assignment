const dbConfig = {
  "development": {
    "username": "root",
    "password": "Upesh@123",
    "database": "hyperce-ecommerce",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "hyperce-ecommerce",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "hyperce-ecommerce",
    "host": "localhost",
    "dialect": "mysql"
  }
}

module.exports = dbConfig;
