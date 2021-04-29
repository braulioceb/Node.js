const http = require('http');
const os = require('os');
const fs = require('fs');
const path = "./server.txt" ;

const port = 3000;
const server = http.createServer(function (req, res){
    const {url, method} = req;
    const [urlNoQuery] = url.split('?');
    const [,urlQuery] = url.split('?'); 
    const urlMethod = urlNoQuery + "-" + method;
    
    if (urlMethod === '/-GET'){
        console.log("WELCOME TO MY PAGE");
        res.statusCode = 200;
        return res.end('OK');
    }
    
    if (urlMethod === '/books-GET'){
        try{ 
            const content = fs.readFileSync(path, { encoding: "utf-8" });
            console.log(content);
            res.statusCode = 200;
            return res.end('OK');
        } catch(error){
            console.log(error);
            res.statusCode = 404;
            return res.end('Not Found');
        }        
    }

    if (urlMethod === '/books-POST'){
        try{ 
            let contentServer = fs.readFileSync(path, { encoding: "utf-8" });
            if (contentServer === ""){
                contentServer = "{}";
            }
            const timeConsulting = Date.now();
            const objContent = JSON.parse(contentServer);
            const newObj = {
                'newObject': timeConsulting,
            };
            const finalObject = Object.assign(objContent, newObj);

            fs.writeFileSync("./server.txt", JSON.stringify(finalObject) );
            res.statusCode = 200;
            return res.end('OK');
        } catch(error){
            console.log(error);
            res.statusCode = 404;
            return res.end('Not Found');
        }  
    }

    if (urlMethod === '/books-DELETE'){
        try{
            fs.writeFileSync("./server.txt", "");
            res.statusCode = 200;
            return res.end('OK')
        } catch(error){
            console.log(error);
            res.statusCode = 404;
            return res.end('Not Found');
        }
    }

    if (urlMethod === "/file-viewer-GET"){
        const [name] = urlQuery.split('=');
        const [, filename] = urlQuery.split('=');
        try{ 
            const content = fs.readFileSync("./"+filename, { encoding: "utf-8" });
            console.log(content);
            res.statusCode = 200;
            return res.end('OK');
        } catch(error){
            console.log(error);
            res.statusCode = 400;
            return res.end('Bad Request');
        }        

    }
    
    if (urlMethod === '/server-status-GET'){
        const hostname = os.hostname();
        const cpus = os.cpus();
        const arch = os.arch();
        const uptime = os.uptime();
        const userInfo = os.userInfo();
        const freemem = os.freemem();
        const serverStatus = {
            "hostname": hostname,
            "cpus": cpus,
            "arch": arch,
            "uptime": uptime,
            "userInfo": userInfo,
            "freemem": freemem
        }
        console.log(serverStatus);
        res.statusCode = 200;
        return res.end('OK');
    }

    res.statusCode = 404
    return res.end("Not Found")
});

server.listen(port, () => {
    console.log(`server runing at port ${port}`)    
});


