const readline = require('readline');
const fs = require('fs');
const path = require('path');


const deledeQuestion =  function(pathDir){
  const interface = readline.createInterface(
    process.stdin,
    process.stdout
  );  
  interface.question(`Directory is not empty, do you want to remove all content [yes]/no?`, (answer) => {
    if (answer.trim() === "yes"){
      try{
        const fileObj = fs.readdirSync(pathDir, { withFileTypes: true });
        let countDir = 0;
        let countFile = 0;
        fileObj.forEach((file) => {
          if (file.isDirectory()){
            countDir += 1;  
          } else{
            countFile += 1;
          }
        });
        console.log(`Remove ${countDir} directories, ${countFile} archivos`); 
         fs.rmSync(pathDir, { recursive: true });
      } catch(err){
        console.log(err);
      }
    }
    interface.close();
  });
};



const isEmptyDir = function(file){
  return file.length === 0
}

const deledeDir =  function(pathDir){
  const fileObj = fs.readdir(pathDir, (err, file)=>{
    if (err){
      return console.log(err);
    } else{
      if (isEmptyDir(file)){
        fs.rmSync(pathDir, { recursive: true });
        return console.log('The directory was empty, but it has removed'); 
      } 
      return deledeQuestion(pathDir);
    }
  });
}

//deledeDir('C:/Users/Usuario1/Documents/Ksquare/Node.js/DeledeFile/delete');

if (process.argv[2] !== undefined){
  deledeDir(process.argv[2]);
} else{
  console.log("nungun archivo ha sido borrado");
}