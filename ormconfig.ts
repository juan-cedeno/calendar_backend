import dotenv from 'dotenv'
dotenv.config()

module.exports = {
   "type": "mysql",
   "host": "localhost",
   "port": process.env.PORT_DB,
   "username": process.env.USERNAME,
   "password": process.env.PASSWORD,
   "database": process.env.DATABASE,
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
