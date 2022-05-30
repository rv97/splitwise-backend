<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Splitwise Application using [Nest.js](https://github.com/nestjs/nest), [Next.js](https://github.com/vercel/next.js/) and ORM - [Prisma](https://github.com/prisma/prisma)

## Running the app

```bash
# development
$ docker-compose up dev
```
or
```bash
$ npm install
$ npm run start:dev
```
```http
http://localhost:3000/signup
```

## Swagger Documentation

To see all the endpoints of the application, go to this link.
All the endpoints except the signup and login are protected using Bearer token. Generate the token first by signing up or logging in and then authorize using that token for other endpoints.
```http
  http://localhost:3000/swagger
```

## Functions

  ```
  1. Signup as a new user.
  2. Login if you are an existing user.
  3. Create an expense.
  4. See the stats.
  ```
