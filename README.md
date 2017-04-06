Angular 2 & Express & ES6 REST API Boilerplate
==================================


[![bitHound Overall Score](https://www.bithound.io/github/manuelnelson/node-angular-2-boilerplate/badges/score.svg)](https://www.bithound.io/github/manuelnelson/node-angular-2-boilerplate)

This is a straightforward boilerplate for building REST APIs with ES6 and Express in conjunction with an Angular 2 project using Typescript and Webpack.

- Angular Two via [angular](https://angular.io/)
- Backend ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

> Tip: If you are using [Mongoose](https://github.com/Automattic/mongoose), you can automatically expose your Models as REST resources using [restful-mongoose](https://git.io/restful-mongoose).

Getting Started
---------------

```sh
# clone it
git clone git@github.com:manuelnelson/node-angular-2-boilerplate.git
cd node-angular-2-boilerplate

# Make it your own
rm -rf .git && git init && npm init

# Install dependencies
npm install

# Start development live-reload server
npm run start:dev

# Start production server:
npm start

```
Docker Support
------
```sh
cd node-angular-2-boilerplate

# Build your docker
docker build -t es6/api-service .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 es6/api-service
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   

```

Docker Demo
-------------------------
It's supposed to be pretty easy to take your Docker to your favourite cloud service, here's a demo of what's our Dockerized bolierplate is like: [https://docker-deployment-yudfxfiaja.now.sh/api](https://docker-deployment-yudfxfiaja.now.sh/api)

License
-------

MIT
