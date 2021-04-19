const readline = require('readline');
const fs = require('fs');
const path = require('path');


const deledeQuestion =  function(pathDir){
  const interface = readline.createInterface(
    process.stdin,
    process.stdout
  );  
  interface.setPrompt(`Directory is not empty, do you want to remove all content [yes]/no `);
  interface.prompt();
  interface.on('line', (answer) => {
    if (answer === "yes"){
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
          { withFileTypes: true }
        });
        console.log(`Remove ${countDir} directories, ${countFile} archivos`);
      } catch(err){
        console.log(err);
      }
    }
    interface.close();
  });
};



const isEmptyDir = function(pathDir){
  try{
  const fileObj = fs.readdirSync(pathDir);
  return fileObj.length === 0
  }catch(err){
    console.log(err) 
  }
}

const deledeDir =  function(pathDir){
  if (fs.existsSync(pathDir)){
    if (isEmptyDir(pathDir)){
      //fs.rmSync(pathDir, { recursive: true });
      console.log('The directory was empty, but it has removed')
    } else {
      deledeQuestion(pathDir);
    }
  } else {
    throw new Error("The path is not valid");
  }
  return ""
};

console.log( deledeDir('C:/Users/Usuario1/Documents/Ksquare/Node.js/DeledeFile/delede'))
