const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const userRoute = require('./api/route/userRoute');
const postRoute = require('./api/route/postRoute')
const config = require('./api/config/config')
const App = express();

mongoose.connect(config.DBURL,{
    useNewUrlParser: true
}).then( () => {
    console.log('Database connected')
}).catch(err => {
    console.log(`Database connection faild ${err}`)
})
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3030

App.use(bodyParser.urlencoded({extended: false}))
App.use(bodyParser.json())
App.use(cors())

App.use('/api/users', userRoute);
App.use('/api/posts', postRoute);


//
App.use((req, res, next) => {
    const error = new Error('error occured')
          error.status = 404
    next(error)
})
App.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error
    })
})


App.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})