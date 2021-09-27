# Appointiments
An api for making appointments at the book customers.

* Management slots of time
* Set which days of the week professional are going to available and interval of time for each day
* Each slot has a duration of 1 hour and contains two availability periods of 1 hour
* Customer books a session blocking slots in order to not have conflicts with other customers trying to book session at the same time

# Tools

* NodeJS & Express
* Typescript
* Jest
* Redis (caching the main routes)
* Mongo (storing notifications)
* Postgres (relationships)
* TypeORM
* Prettier & Eslint
* [Multer](https://github.com/expressjs/multer)
* [Handlebars](https://github.com/handlebars-lang/handlebars.js)
* [Tsyringe](https://github.com/microsoft/tsyringe)
* [Celebrate](https://github.com/arb/celebrate)
* AWS SES & [Ethereal](https://ethereal.email)
* AWS S3

# Instructions

1. Run `yarn install`
2. `change config for your Postgres SQL DB and MongoDB in ./ormconfig.json`
3. `change config for your Redis NoSQL DB in ./.env`
4. Run `yarn dev`
5. Import `./insomnia_book_customers.json` in your Insomnia to call API's

# Optional

* Run `yarn test`
* Configure your keys in `./.env` for AWS to send email and storage user avatar

# Work infos

* You need register users to receive bookings
* You need register users to make bookings sending id of professional booking
* You need send bookings from customer user after has logged

# Other infos

* Node version 14.17.4 (LTS)
* NPM version 6.14.14

# Todo
* Api docs using [aglio](https://github.com/danielgtaylor/aglio)
