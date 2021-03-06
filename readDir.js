const fs = require('fs');
//const fsPromise = require('fs').promises;
const path = require('path');

const readDir =  function(pathDirectory = __dirname){
  try{
    fileObjs = fs.readdirSync(pathDirectory, { withFileTypes: true });
    fileObjs.forEach(file => {
      if (file.isDirectory()){
        console.log(file.name+"/");
      } else{
        console.log(file.name);
      }  
    });
  } catch(err){
    console.log(err);
  }  
} 

if (process.argv[2] !== undefined){
  readDir(process.argv[2])
} else{
  readDir();
}