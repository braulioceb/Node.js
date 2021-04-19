const fs = require('fs');
const path = require('path');

const readDir =  function(pathDirectory = __dirname){
  if (fs.existsSync(pathDirectory)) {
    try{
      fileObjs = fs.readdirSync(pathDirectory, { withFileTypes: true });
      fileObjs.forEach(file => {
        if (file.isDirectory()){
          console.log(file.name+"/")
        } else{
          console.log(file.name)
        }
        
      });
    } catch(err){
      console.log(err);
    }
  } else{
    throw new Error("La dirección no existe")
  }
}

console.log("La función creada imprimirá los elementos de una determinada dirección (si es que ésta existe) ...........")
readDir('C:/Users/Usuario1/Documents/Ksquare/Node.js/FirstEvent/.')


console.log("\n")
console.log("La función imprime por default los archivos en su respectivo directorio...................")
readDir()