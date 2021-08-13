# Appointiments
An api for making appointments at the book customers.

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

# Other infos
* Node version 14.17.4 (LTS)
* NPM version 6.14.14

# Todo
* Api docs using [aglio](https://github.com/danielgtaylor/aglio)
