// INSTALLATIONS
// npm init -y
// npm install minimist
// npm i puppeteer (downloads it's own compatible chromium browser).

// node 1_HackerrankAutomation.js --url=https://www.hackerrank.com/ --config=config.json 
let minimist=require("minimist");
let fs=require("fs");
let puppeteer = require('puppeteer');
const { start } = require("repl");
const { createBrotliCompress } = require("zlib");

let args=minimist(process.argv);
console.log(args.url);

let configjson=fs.readFileSync(args.config,"utf-8");
let config=JSON.parse(configjson);


async function run(){
    //har function jo promise return krega, usme await lagana hota h.
    let browser = await puppeteer.launch({headless:false,
        args:[
            '--start-maximized'
        ],
        defaultViewport:{
            width:1500,
            height:900,
            isMobile:false
        }
    }); //{headless:false} helps us to actually see all the automated operations as puppeteer is executing them.

    let pages = await browser.pages();
    let page=pages[0];
    await page.goto(args.url);    //open hackerrank

    
   //Challenges while developing this project?
   //The biggest challenge was to inspect for different attributes for button identification as majority sites have a defence mechanism for that.
   // Sites generally have dynamically changing names of attributes.
   //so we wait for selectors to properly load and then strike them with action.

    //click on page 1 Login.
    await page.waitForSelector("a[data-event-action='Login']");//we wait till the page loads the given selector.
    await page.click("a[data-event-action='Login']");//inspect the login button

    //click on page 2 Login.
    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
    await page.click("a[href='https://www.hackerrank.com/login']");

    //enter username.
    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']",config.userid);

    //enter password.
    await page.waitForSelector("input[name='password']");
    await page.type("input[name='password']",config.password);

    //click Login Button.
    await page.waitForSelector("button[data-analytics='LoginPassword']");
    await page.click("button[data-analytics='LoginPassword']");

    //click on compete.cd
    await page.waitForSelector("a[data-analytics='NavBarContests']");
    await page.click(("a[data-analytics='NavBarContests']"));

    //click on Manage Contests.
    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");
    
    //click on first contest.
    await page.waitForSelector("P.mmT");
    await page.click("P.mmT");
    
    await page.waitFor(3000);
    //click on Moderator section.
    await page.waitForSelector("li[data-tab='moderators");
    await page.click("li[data-tab='moderators"); 
    
    //Type Moderators name and press Enter.
    await page.waitForSelector("input#moderator");
    await page.type("input#moderator",config.moderators[0],{delay: 20}); 
    await page.keyboard.press("Enter");

    // // Find all contest URLs of same page.
    // await page.waitForSelector("a.backbone.block-center");
    // let curls=[];  //curls(Contest urls) is an array of the urls of all the contests on that page.   
    // curls=await page.$$eval("a.backbone.block-center",function(atags){ //eval takes the firstparamter and passes it as an argument(atags) in the funtion().
    //     let urls=[];
    //     for(let i=0;i<atags.length;i++){
    //     let url=atags[i].getAttribute("href");
    //     urls.push(url);
    //     }
    //     return urls;
    // });
    // console.log(curls);

    // for(let i=0;i<curls.length;i++){
    //     let curl=curls[i];

    //     let ctab=await browser.newPage();
    //     await ctab.goto(args.url+curl);

    //     await ctab.bringToFront();
    //     await ctab.waitFor(1000);
    //     await ctab.close();
    //     await ctab.waitFor(1000);
    // }
}

    // async function savemoderator(tab,href,moderator){
    
    // }
run();