```
* nodejs = v18.16.0 => update 22.12.0 to connect DB
* npm = v9.8.1
* yarn = v1.22.19

* "express": "^4.18.2"
* "nodemon": "^3.0.1"
* "eslint": "^8.47.0"

* "@babel/runtime": "^7.22.10"
* "@babel/cli": "^7.22.10"
* "@babel/core": "^7.22.10"
* "@babel/eslint-parser": "^7.22.10"
* "@babel/node": "^7.22.10"
* "@babel/plugin-transform-runtime": "^7.22.10"
* "@babel/preset-env": "^7.22.10"
* "babel-plugin-module-resolver": "^5.0.0"
```

Start App: 

1. npm install 
2. npm run dev
3. config db with .env.example

Introdution: Website use Nodejs, ExpressJS and Handlebars (because I want to focus to learning Javascript )

- Basic project structure/terminology notes: Middleware = methods/functions/operations that are called between processing the request and sending the response.
- An Express app contains [multiple levels of middleware](https://expressjs.com/en/guide/using-middleware.html), such as application-level middleware (`app.use(middleware)` and router-level middleware (e.g., `router.use(middleware)`). `app.use(middleware)` is called every time a request is sent to the server. (`app.get()` is called when the HTTP method is set to GET, whereas `app.use()` is called regardless of the HTTP method.) 
- These define a route handler file as middleware, which also contains middleware - the route files forward requests to controller "actions," methods that handle incoming requests (for example getNewPassword in controllers/auth.js).

Functions: 
1. Management courses with CRUD
2. Payment with ZaloPay 
3. Login, Logout
4. Upload file IMG, AWS S3 service interface object 


Conclusion: <3 Like coding with me...