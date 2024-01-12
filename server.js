const express = require('express')
const app = express()



// routes
app.get('/', (req,res) => { // callback funcs must be used for routes
    res.send('Hello API')
})


app.listen(3000, () => { // this is a callback function
    console.log('Node API is running on Port 3000')
})
