console.log("Wellcome~");
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
  await page.goto("https://cn.bing.com/");

  // 得到img
  await page.waitForSelector("body > div.hpapp > div > div:nth-child(1) > div");
  const img = await page.evaluate(() => {
    return "https://cn.bing.com" + document.querySelector("body > div.hpapp > div > div:nth-child(1) > div").style.backgroundImage.split('"')[1]
  })
  console.log(img)

  // 添加到markdown里的格式
  const img_data = "![](" + img + ")" + new Date().toLocaleDateString();
  // 写到文件里
  await fs.readFile("README.md", "utf-8", (err, data) => {
    if (err) throw err;
    let res = getData(data);
    let r = addImg(res, img_data);
    fs.writeFile("README.md", r, (err) => {
      if (err) throw err;
      console.log("done!");
    });
  });
  await browser.close();

};
start();






// 得到所有img数据
function getData(data) {
  let res = [];
  data.split("\n").splice(6).forEach(x => {
    res += x;
  });
  res = res.split("|");
  for (let i = 0; i < res.length; i++) {
    if (res[i] === "") {
      res.splice(i, 1);
    };
  };
  return res;
};

// 添加img和一些标题、格式
function addImg(res, img) {
  res.unshift(img);
  let r = "";
  r += "## Bing Wallpaper\n\n";
  r += img;
  r += "\n\n| | | |\n";
  r += "| - | - | - |\n";

  for (let i = 0; i < res.length; i++) {
    if ((i + 1) % 3 === 0) {
      r += "|" + res[i] + "|\n";
    } else {
      r += "|" + res[i];
    };
  };
  if ((res.length) % 3 === 0) {
    ;
  } else {
    r += "|";
  };
  return r;
};