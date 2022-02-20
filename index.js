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
  fs.readFile("./README.md", "utf-8", (err, data) => {
    if (err) console.log(err);

    data = getData(data);
    data.unshift(img_data);
    let content = addImg(data);

    fs.writeFile("README.md", content, (err) => {
      if (err) console.log(err)
      console.log("done!")
    })

  })

  await browser.close();

};
start();

// 得到所有img数据
function getData(data) {
  var regex = /!\[\]\(http[s]{0,1}:\/\/(.*?)\.jpg\)\d{1,4}\/\d{1,4}\/\d{1,4}/g;
  data = data.match(regex).splice(1);
  return data;
};

// 添加img和一些标题、格式
function addImg(data) {
  let content = "";
  content += "## Bing Wallpaper";
  content += "\r\n";
  content += "\r\n";
  content += data[0];
  content += "\r\n";
  content += "\r\n";
  content += "| | | |";
  content += "\r\n";
  content += "| - | - | - |";
  content += "\r\n";
  for (let i = 0; i < data.length; i++) {
    content += "|" + data[i]
    if ((i + 1) % 3 === 0 || (i + 1) === data.length) {
      content += "|";
      content += "\r\n";
    }
  }
  return content;
};
