console.log("helloworld");
console.log("helloworld");
console.log("helloworld");
console.log("helloworld");

const fs = require("fs");

fs.writeFile("test.txt", "I love Shanghai!\n", { "flag": "a+" }, (err) => {
  if (err) console.log(err);
  console.log("写入成功！");
});

console.log("运行结束~");