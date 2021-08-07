const express = require("express");
const puppeteer = require('puppeteer');

const reviewRoute = require('./routes/reviews');
const app = express();

app.get('/',(req,res)=>{
    return res.status(200).send({
        status: "SUCCESS",
        message: "I am successful :)"
    })
})

// app.post('/',(req,response)=>{

//     // const URL = "https://www.flipkart.com/search?q=mobiles";
//     const URL = "https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3";
//     return request(URL, function (err, res, body) {
//         if(err)
//         {
//             console.log(err, "error occured while hitting URL");
//         }
//         else
//         {
//             console.log("-----------------")
//             // console.log(body)
//             const $ = cheerio.load(body, null, false);
//             // $('div._1YokD2 > div.col-12-12>div._13oc-S').each(function(index){
//             $('div.review > div.leftCol > dl.itemReview > dd').each(function(index){
                
//                 // const link = $(this).find('div._2kHMtA>a').attr('href');
//                 // // const name = $(this).find('div._1-2Iqu>div.col-7-12>div._3wU53n').text();
//                 // console.log(link,"\n");   //link for smartphone
//                 // // console.log(name);   //name of smartphone
//                 const rating = $(this).find('div.itemRating > strong')
//                 console.log(this);
//             });
//             // console.log($);
//             console.log("-----------------")
//             return response.status(200).send({
//                 message: "URL Processed"
//             });
//         }
//     });

// })

app.use(express.urlencoded());
app.use(express.json());

app.use('/reviews',reviewRoute);


const port = process.env.PORT || 5050
app.listen(
    port,
    console.log(`Server started on port ${port}`)
)