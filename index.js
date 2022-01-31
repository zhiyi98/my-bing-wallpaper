console.log("helloworld");
console.log("helloworld");
console.log("helloworld");
console.log("helloworld");

// const fs = require("fs");

// fs.writeFile("test.txt", "I love Shanghai!\n", { "flag": "a+" }, (err) => {
//   if (err) console.log(err);
//   console.log("写入成功！");
// });

// console.log("运行结束~");

const puppeteer = require('puppeteer');
const fs = require('fs');

async function start() {
  const browser = await puppeteer.launch(/*{ headless: false }*/);
  const page = await browser.newPage();
  await page.goto("https://www.bing.com");  
  page.waitForSelector("body > div.hpapp > div > div:nth-child(1) > div");
  const img = await page.evaluate(() => {
    return "https://cn.bing.com" + document.querySelector("body > div.hpapp > div > div:nth-child(1) > div").style.backgroundImage.split('"')[1]
  })
  console.log(img)
  // 写到txt文件里
  const data = new Date().toLocaleDateString() + "\n" + "![](" + img + ")\n";
  await fs.writeFile("README.md", data, { 'flag': "a+" }, (err) => {
    if (err) console.log("err");
    console.log('The file has been saved!\t'+img);
  });
};
start();
