const express = require('express')
const app = express()
const fs = require('fs')
const pinyin = require('pinyin')
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
function createHash(hashLength){
  if (!hashLength || typeof (Number(hashLength)) != 'number') {
    return;
  }
  var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  var hs = [];
  var hl = Number(hashLength);
  var al = ar.length;
  for (var i = 0; i < hl; i++) {
    hs.push(ar[Math.floor(Math.random() * al)]);
  }

  return hs.join('');
}
app.post('/getpinyin', function (req, res) {
  const {
    word
  } = req.query
  const heteronymPinyin = pinyin(word, {
    segment:true,
    heteronym:true,
    style:2
  })
  const tonePinyin = pinyin(word,{
    heteronym:true,
    style:1,
  })

  const tonePinyin2 = pinyin(word,{
    style:2,
    heteronym:true
  })
  console.log(tonePinyin2);
  const py_info = heteronymPinyin.map((item, index) => {
    const obj = {
      id:createHash(8),
      p: item[0],
      p_number: tonePinyin2[index][0],
      p_heteronym:tonePinyin[index],
      s: word[index],
      media:tonePinyin2[index].map(ele=>`http://192.168.5.160:2222/${ele}.mp3`)
    }
    return obj
  })[0]
  res.send(py_info)
})
console.log('服务启动');
app.listen(1234)