const express = require('express');
const mongoose = require('mongoose');
const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
const mongoDB = require('mongodb');

const app = express();
//const URI = 'mongodb+srv://jonathan2110:JonaT0621Ps@cluster0.nuo47cc.mongodb.net/DesignDatabase?retryWrites=true&w=majority';
const URI = 'mongodb+srv://jonathan2110:LyMcVbLfHLNQMKjd@cluster0.nuo47cc.mongodb.net/DesignDatabase?retryWrites=true&w=majority';
const conn = mongoose.createConnection(URI, {useNewUrlParser: true});
const { ObjectID } = require('mongodb');

let gfs;

//mongoose.connect(URI, {useNewUrlParser: true});
//Initializes the gridfs storage.
const storage = new GridFsStorage({ db: conn,
    file:(req,file)=>{
        return {
            filename: file.originalname,
            bucketName: 'files',
        };
    } 
  });
  
  //Warns that the connection has been opened.
conn.once('open',()=>{
    console.log('Open');
    gfs = new mongoDB.GridFSBucket(conn.db, {bucketName: 'files'});
});
  
//Declares multer middleware to use with gridfs.
const upload = multer({storage});

//Sets the server to serve html files.
app.set('view engine','html');

//Sets the server to get its resources from the specified directory.
//app.use(express.static(__dirname+'/'));

/*app.listen(3000,()=>{
    console.log('app listening in port 3000');
    
});
*/

app.post('/api/postData', (req,res) => {
    const user1 = req.body.name;
});


async function createUserMongo(username,password,firstName,firstSurname,birthDate,photoUser){
  let photo = null;
  let birthday = new Date(birthDate);
  let user = await conn.collection('users').insertOne(
      {
          username: username,
          password: password,
          firstName: firstName,
          firstSurname: firstSurname,
          birthDate: birthday,
          photo: photo,
      }
  )
  return user; 
}

createUserMongo("jonat","1234","jonathan","porras","21/10/2003", null);



