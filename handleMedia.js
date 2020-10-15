const fs = require('fs');
const download = require('download');
const dist = './dist'
const pinyin = require("pinyin");
let str = ''
let resAry = []
function handle(str) {
  return pinyin(str, {
    style: 2
  })
}

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
  fs.mkdirSync(path)
}
delDir(dist)

const jsonString = fs.readFileSync('./webpinyi.json', 'utf8')
const obj = JSON.parse(jsonString)
const keys = Object.keys(obj)
keys.forEach(item => {
  str += obj[item]
});
const ary = str.split('')
ary.forEach(item => {
  const singleAry = handle(item)[0]
  singleAry.forEach(iitem => {
    if (!resAry.includes(iitem)) {
      if(iitem !== '〇'){
        resAry.push(iitem)
      }
    }
  })
})
resAry.forEach(item => {
  const testAry = ['1','2','3','4']
  if(!testAry.includes(item.charAt(item.length-1))){
    item+='5'
  }
    const url = `https://hanyu-word-pinyin-short.cdn.bcebos.com/${item}.mp3`
    download(url, dist).catch(err=>{
      console.log('错误错误错误错误错误错误',err.path);
    })
  })
