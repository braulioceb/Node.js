const fs = require('fs');
const path = require('path');

const callbackReadDir = (error, file) => {
  if(error){
    console.log(error);
  } else{
    file.forEach(file => {
      if (file.isDirectory()){
        console.log(file.name+"/");
      } else{
        console.log(file.name);
      }
    });    
  }
}

const readDir =  function(pathDirectory = __dirname){
    fileObjs = fs.readdir(pathDirectory, { withFileTypes: true }, callbackReadDir);
}; 

if (process.argv[2] !== undefined){
  readDir(process.argv[2])
} else{
  readDir();
}