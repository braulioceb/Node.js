const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const readDir = async function(pathDirectory = __dirname){
  try{
    fileObjs = await fsPromise.readdir(pathDirectory, { withFileTypes: true });
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

//Dirección de prueba ....        C:/Users/Usuario1/Documents/Ksquare/Node.js/Firstevent/.