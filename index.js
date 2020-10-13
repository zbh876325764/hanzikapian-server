const express = require('express')
const app = express()
const fs = require('fs')
const pinyin = require('pinyin')
app.post('/getpinyin',function(req,res){
  // console.log(req);
  // const {word} = req.query
  // let wordAry = word.split('')
  // pinyin(word,{

  // })
  res.send('hello word')
})
console.log('服务启动');
app.listen(1234)