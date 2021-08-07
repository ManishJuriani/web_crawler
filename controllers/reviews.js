const puppeteer = require('puppeteer');
const logger = require('../utils/logger');
const logMsgs = require("../static/log_messages");
const respMsgs = require("../static/resp_messages");
const consts = require("../static/constants");

exports.getReviewData = async (req, res)=> {
    try{
        const {url} = req.body
        
        // check if url is sent in the request body
        if(!url){            
            return res.status(400).send({
                message: respMsgs.getRev_urlNotSent,
            })
        }
        // if url is sent, check if the domain name is tigerdirect.com
        if(!url.startsWith(consts.tigerDirectDomainNm)){
            return res.status(400).send({
                message: respMsgs.getRev_urlNotOfCorrectDmn,
            })
        }

        // launch browser with puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // simulate click on Review Tab
        await page.click('li#reviewtab')

        // fetch document elements for required data
        const reviews = await page.evaluate(() => {
            let data = [];
            let ratings = document.querySelectorAll('div.review > div.leftCol > dl.itemReview > dd > div.itemRating');
            let names = document.querySelectorAll('div.review > div.leftCol > dl.reviewer > dd:first-of-type');
            let dates = document.querySelectorAll('div.review > div.leftCol > dl.reviewer > dd:last-of-type');
            let reviewHeadings = document.querySelectorAll('div.review > div.rightCol > blockquote > h6');
            let reviewComments = document.querySelectorAll('div.review > div.rightCol > blockquote > p');

            for(let index=0;index<ratings.length;index++){
                data.push({
                    rating: ratings[index].textContent,
                    reviewerName: names[index].textContent,
                    reviewDate: dates[index].textContent,
                    reviewHeading: reviewHeadings[index].textContent,
                    reviewComment: reviewComments[index].textContent
                });
            }
            return data;
        });

        logger.info(logMsgs.rvs_getRevSuc(reviews));

        res.status(200).send({
            message: respMsgs.SUCCESS,
            listOfReviews: reviews
        });

        await browser.close();
    }catch(err){
        logger.error(err);
        return res.status(503).send({
            message: respMsgs.ISE,
        });
    }
}