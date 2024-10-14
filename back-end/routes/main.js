const login=require('./introduce')
const temperary_public=require('./temperary_public')
const courses= require('./course')
const meRouter= require('./me')

const authRoutes = require('./auth');
function routes(app){
    app.use('/me',meRouter)
    app.use('/courses',courses)
    app.use('/login',login);
    app.use('/forgot', authRoutes);

    app.use('/',temperary_public) 
    
}
module.exports = routes