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

app.post('/uploadUserPhoto',upload.single('photoUser'), (req,res)=> {
    let idPhoto = req.file.id;
    res.json({"idPhoto":idPhoto});
});



app.post('/api/postData', (req,res) => {
    const user1 = req.body.name;
});


async function createUserMongo(rol,username,password,email,telephone,codPostal,firstName,middleName,firstSurname,secondSurname/*,birthDate*/,photoUser, cart, orders){
  let photo = null;
  //let birthday = new Date(birthDate);

  let user = await conn.collection('users').insertOne(
      {
          rol: rol,
          username: username,
          password: password,
          email: email,
          telephone: telephone,
          codPostal: codPostal,
          firstName: firstName,
          middleName: middleName,
          firstSurname: firstSurname,
          secondSurname : secondSurname,
          //birthDate: birthday,
          photo: photo,
          cart: cart,
          orders: orders
      }
  )
  return user; 
}

async function createCart(user, items){

    let userId = new mongoDB.ObjectId(user);

    let order = await conn.collection('carts').insertOne(
        {
            user : userId,
            items: items
        }
    )
    return order; 
}

/*
    let itemIds = [];
    for(let i =0;i < items.length;i++){
        itemIds.push(new mongoDB.ObjectId(items[i]));
    }
*/

//createCart("652d968a89d8331c6d57936d", null);

async function createUserOrder(user,items, orderDate, deliveryDate, stateOrder, address, voucher, detail, totalPrice){

  let order = await conn.collection('orders').insertOne(
      {
          user : user,
          items: items,
          orderDate : orderDate,
          deliveryDate: deliveryDate,
          stateOrder: stateOrder,
          address : address,
          voucher: voucher,
          totalPrice : totalPrice,
          detail : detail
      }
  )
  return order; 
}

//createUserOrder("652d968a89d8331c6d57936d")

async function createAddress(country, state, region, city, detail){

    let address = await conn.collection('addresses').insertOne(
        {
            country : country,
            state : state,
            region : region,
            city : city,
            detail : detail
        }
    )
    return address; 
}

async function createItem(entity,purchasable, amount, price){

    let item = await conn.collection('itemsOrders').insertOne(
        {
            entity, entity,
            purchasable: purchasable,
            amount : amount,
            price : price
        }
    )
    return item; 
}

async function createCourse(dateCourse, minutesDuration, description, materials){

    let course = await conn.collection('courses').insertOne(
        {
            dateCourse : dateCourse,
            minutesDuration : minutesDuration,
            description : description,
            materials : materials
        }
    )
    return course; 
}

async function createMakeupService(status,title,description,images, subcategory){

    let makeupService = await conn.collection('makeupService').insertOne(
        {
            status: status,
            title : title,
            description: description,
            images : images,
            subcategory : subcategory
        }
    )
    return makeupService; 
}

async function createProduct(title, description, price, categoryProduct, status, brand){

    let product = await conn.collection('products').insertOne(
        {
            title : title,
            description : description,
            price : price,
            category : categoryProduct,
            status : status,
            brand : brand
        }
    )
    return product; 
}

async function createCategory(name, subcategoriesGallery, type){

    let category = await conn.collection('categories').insertOne(
        {
            name : name,
            subcategoriesGallery : subcategoriesGallery,
            type: type
        }
    )
    return category; 
}

async function createSubcategory(name){

    let subcategory = await conn.collection('subcategories').insertOne(
        {
            name : name,
        }
    )
    return subcategory; 
}

//createUserMongo("ADMINISTRADOR","jonat","1234","jonathanporrassandi@gmail.com","86398772", "506", "jonathan","andrey", "porras","sandi","21/10/2003", null,null,null);



