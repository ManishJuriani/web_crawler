const express = require("express");

const reviewRoute = require('./routes/reviews');
const app = express();

app.get('/',(req,res)=>{
    return res.status(200).send({
        status: "SUCCESS",
        message: "I am successful :)"
    })
})

app.use(express.urlencoded());
app.use(express.json());

app.use('/reviews',reviewRoute);


const port = process.env.PORT || 5050
app.listen(
    port,
    console.log(`Server started on port ${port}`)
)