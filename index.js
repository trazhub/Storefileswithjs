const express = require('express');
const fileUpload = require('express-fileupload');
const fetch = require("node-fetch");
const path = require('path');
const fs = require('fs');
const app = express();

let urdomain = `http://localhost:80`;

const PORT = 80;
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/",async function(req,res){
  let res1 = await fetch(`${urdomain}/api/getFiles/`);
  let dataf = await res1.json();
  let res2 = await fetch(`${urdomain}/api/getServer/`);
  let datad = await res2.json();
  res.render("Servers",{datad,dataf});
});

app.get("/server/:serverName",async function(req,res){
  let serverName = req.params.serverName;
  // serverName = serverName.replaceAll("__","/")
  let res1 = await fetch(`${urdomain}/api/getFile/${serverName}`);
  let dataf = await res1.json();
  let res2 = await fetch(`${urdomain}/api/getDir/${serverName}`);
  let datad = await res2.json();
  serverName = serverName.replaceAll("/","__")
  res.render("Serverinfo",{dataf,datad,serverName});
});


// app.use('/form', express.static(__dirname + '/index.html'));

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.get('/api/getServer/',function(req,res){
  testFolder = __dirname+`/uploads`
  let data=[];
  fs.readdirSync(testFolder).forEach(file => {
    if(file.includes(".")){
    }else{
      data.push({
        dir:`${file}/`
      })
    }
    
      
  });
  res.send(data);
})

app.get('/api/getFiles/',function(req,res){
  testFolder = __dirname+`/uploads`
  let data=[];
  fs.readdirSync(testFolder).forEach(file => {
    if(file.includes(".")){
      data.push({
        file:`${file}/`
      })
    }else{
    }
    
      
  });
  res.send(data);
})

app.get('/api/getDir/:serverName',function(req,res){
    DemoFile = req.params.serverName
    DemoFile = DemoFile.replaceAll("__","/")
    testFolder = __dirname+`/uploads/${DemoFile}/`
    let data=[];
    fs.readdirSync(testFolder).forEach(file => {
      if(file.includes(".")){
      }else{
        data.push({
          dir:`${file}/`
        })
      }
    });
    res.send(data);
})

app.get('/api/getFile/:serverName',function(req,res){
    DemoFile = req.params.serverName
    DemoFile = DemoFile.replaceAll("__","/")
    testFolder = __dirname+`/uploads/${DemoFile}/`
    let data=[];
    fs.readdirSync(testFolder).forEach(file => {
      if(file.includes(".")){
          data.push({
            file:`${file}`
          })
        }else{
        }
    });
    res.send(data);
})


app.get('/api/readFile/:serverName',function(req,res){
    DemoFile = req.params.serverName
    DemoFile = DemoFile.replaceAll("__","\\")
    testFolder = __dirname+`/uploads/${DemoFile}`
    res.download(path.join(__dirname, `/uploads/${DemoFile}`), (err)=>{
      // console.log(err);
    });
    // console.log('Your file has been downloaded!')
})

app.post('/api/upload/:serverName', function(req, res) {
  DemoFile = req.params.serverName
  DemoFile = DemoFile.replaceAll("__","/")
  testFolder = __dirname+`/uploads/${DemoFile}/`
  let sampleFile;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

//   console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;

  uploadPath = testFolder + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
  });
});

app.listen(PORT, function() {
  console.log('Express server listening on port http://localhost:'+PORT); // eslint-disable-line
});