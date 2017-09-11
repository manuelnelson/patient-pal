Client Pal
==================================


[![bitHound Overall Score](https://www.bithound.io/github/manuelnelson/node-angular-2-boilerplate/badges/score.svg)](https://www.bithound.io/github/manuelnelson/node-angular-2-boilerplate)


Getting Started
---------------

```sh
# clone it
git clone git@github.com:manuelnelson/client-pal.git
cd client-pal

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
cd client-pal.git  

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
