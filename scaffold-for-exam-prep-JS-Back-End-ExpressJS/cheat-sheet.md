# Cheat Sheet

1. Initialize project and stucture(index.js);
2. Setup dev env (nodemon);
3. Install and setUp Express;
    - add static middleware
    - add body parser 
    - add routes
4. add static resources
5. add views folder with ready htmls
6. add view engine express-handlebars
    - install
    - add to express
    - config extension
    -config views
    - add main layout and partials
    - fix static paths
    - render home page
7. Add controller folder with homeControllers
8. Add DB
    - install mongoose
    - connect DB
9. Authentication pages
    - add userController
    -add controller to routes
render login and register
10. Andd user mmdel, add unique true username
    - validate repeat password
11. Add user manager
    - add login and register methods
    - required in user controller
12.Modify login and register forms
13. add register and login post actions
14. implement user manager login and register
15. Validate if user alreay exist 
16. Hash password
    - install bcrypt
    - hash password
17. Login 
    - find user by username
    - validate password
18. generate JWT token
    - install jwt
    -promisify jsonwebtoken
    -create secter, generate token
    19. Return token in cookie
    - intal and config cookie-parser
    18. Logout
    19. Authtentication middleware
    20. Authrization middlaware
    21. Dinamig nav bar
    -add res locals
    22. Error handling
    - global error handler
    23. Add 404 page
    24. show Error notifications
