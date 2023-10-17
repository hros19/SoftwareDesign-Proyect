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


async function createUser(rol,username,password,email,telephone,codPostal,firstName,middleName,firstSurname,secondSurname/*,birthDate*/,photoUser, cart, orders){
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

async function updateUser(username,email,telephone,codPostal,firstName,middleName,firstSurname,secondSurname/*,birthDate*/,photoUser){
    let idPhoto = new mongoDB.ObjectId(photoUser);
    let result = await conn.collection('users').updateOne({username: username},{$set: {email : email, telephone : telephone,
         codPostal: codPostal, firstName : firstName, middleName: middleName, firstSurname: firstSurname, secondSurname : secondSurname,
        photoUser, idPhoto}});

    return result; 
}

async function updatePassword(username,password){
    let result = await conn.collection('users').updateOne({username: username},{$set: {password: password}});
    return result;
}

async function deleteUser(username){
    let result = await conn.collection('users').deleteOne({username: username});
    return result;
}


async function createCart(user){

    let userId = new mongoDB.ObjectId(user);

    let cart = await conn.collection('carts').insertOne(
        {
            user : userId,
            items: []
        }
    )

    return cart;
}

async function getCart(user){
    let userId = new mongoDB.ObjectId(user);

    let cart = await conn.collection('carts').find({_id: userId})

    return cart.toArray()[0];
}

//createCart("652d968a89d8331c6d57936d");

async function addProductCart(user, product) {
    let userId = new mongoDB.ObjectId(user);
    let productId = new mongoDB.ObjectId(product);

    let consult = await conn.collection('carts').find({user:userId})
    let response = await consult.toArray();
    let temp = [];
    temp = response[0].items;
    temp.push(productId);

    console.log(temp);
    await conn.collection('carts').deleteOne({user:userId});

    consult = await conn.collection('carts').insertOne(
        {
            user : userId,
            items : temp
        }
    )

    return consult;
}

async function removeProductCart(user, index) {
    let userId = new mongoDB.ObjectId(user);

    let consult = await conn.collection('carts').find({user:userId})
    let response = await consult.toArray();
    let temp = [];
    temp = response[0].items;

    let res = [];
    for (let i = 0; i < temp.length; i++ ){
        if(i + 1 != index){
            res.push(temp[i]);
        }    
    }

    console.log(res);
    await conn.collection('carts').deleteOne({user:userId});

    consult = await conn.collection('carts').insertOne(
        {
            user : userId,
            items : res
        }
    )

    return consult;
}

//addProductCart("652d968a89d8331c6d57936d", "652d968a89d8331c6d57936d");
//removeProductCart("652d968a89d8331c6d57936d", 1);



/*
    let itemIds = [];
    for(let i =0;i < items.length;i++){
        itemIds.push(new mongoDB.ObjectId(items[i]));
    }
*/

//createCart("652d968a89d8331c6d57936d", null);

async function createUserOrder(user,items, orderDate, deliveryDate, stateOrder, address, voucher, detail, totalPrice){
    let userId = new mongoDB.ObjectId(user);
    let voucherId = new mongoDB.ObjectId(voucher);
    let addressId = new mongoDB.ObjectId(address);

    let itemIds = [];
    for(let i =0;i < items.length;i++){
        itemIds.push(new mongoDB.ObjectId(items[i]));
    }
    let order = await conn.collection('orders').insertOne(
        {
            user : userId,
            items: itemIds,
            orderDate : orderDate,
            deliveryDate: deliveryDate,
            stateOrder: stateOrder,
            address : addressId,
            voucher: voucherId,
            totalPrice : totalPrice,
            detail : detail
        }
    )
    return order; 
}

//createUserOrder("652d968a89d8331c6d57936d", ["652d968a89d8331c6d57936d","652d968a89d8331c6d57936d"], "21/10/2003", null, "PENDIENTE", "600 oeste del parque nacional", null, "No", "250000");

async function getAllOrders(user){
    let userId = new mongoDB.ObjectId(userId);

    let consult = await conn.collection('carts').find({user:userId})

    return consult.toArray(); 
}

async function getOrder(order){
    let orderId = new mongoDB.ObjectId(order);

    let consult = await conn.collection('carts').find({_id:orderId})

    return consult.toArray()[0]; 
}

async function updateStateUserOrder(order, newState){
    let itemIds = [];
    let orderId = new mongoDB.ObjectId(order);

    let result = await conn.collection('orders').updateOne({_id: orderId},{$set: {stateOrder: newState}});

    return order; 
}

//updateStateUserOrder("652df104a3faf7d5c9e88728", "EN CAMINO");


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

//createAddress("Costa Rica", "San Jose", "Mora", "Colon", "Del hospital 200 metros norte");

//entity: COURSE, PRODUCT, SERVICE
async function createItem(entity,purchasable, amount, price){
    //let purchasableID = new mongoDB.ObjectId(purchasable);

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

//createItem("PRODUCT", null,"5", "30000");

async function deleteItem(item){
    let itemId = new mongoDB.ObjectId(item);

    res = await conn.collection('itemsOrders').deleteOne({_id: itemId})
    return res; 
}


//deleteItem("652e022f03b37f28252cdce1");


async function createCourse(dateCourse,images, minutesDuration, description, materials){
    let imagesIds = [];
    for(let i =0;i < images.length;i++){
        imagesIds.push(new mongoDB.ObjectId(images[i]));
    }

    let course = await conn.collection('courses').insertOne(
        {
            dateCourse : dateCourse,
            images: imagesIds,
            minutesDuration : minutesDuration,
            description : description,
            materials : materials
        }
    )
    return course; 
}

async function getCourses(){
    let res = await conn.collection('courses').find()
    return res.toArray(); 
}


async function deleteCourse(course){
    let courseId = new mongoDB.ObjectId(course);
    let course = await conn.collection('courses').deleteOne({_id : courseId})
    return course; 
}


async function createMakeupService(status,title,description,images, subcategory){
    let imagesIds = [];
    for(let i =0;i < images.length;i++){
        imagesIds.push(new mongoDB.ObjectId(images[i]));
    }
    let makeupService = await conn.collection('makeupService').insertOne(
        {
            status: status,
            title : title,
            description: description,
            images : imagesIds,
            subcategory : subcategory
        }
    )
    return makeupService; 
}

async function getAllMakeupServices(){
    let res = await conn.collection('makeupService').find()
    return res.toArray(); 
}

async function getMakeupService(service){
    serviceId = new mongoDB.ObjectId(service);
    let res = await conn.collection('makeupService').find({_id:serviceId})
    return res.toArray()[0]; 
}

async function deleteMakeupService(service){
    serviceId = new mongoDB.ObjectId(service);
    let res = await conn.collection('makeupService').deleteOne({_id : service})
    return res.toArray(); 
}

async function createProduct(title, description,images, price, categoryProduct, status, brand){
    let imagesIds = [];
    for(let i =0;i < images.length;i++){
        imagesIds.push(new mongoDB.ObjectId(images[i]));
    }

    let product = await conn.collection('products').insertOne(
        {
            title : title,
            description : description,
            images, imagesIds,
            price : price,
            category : categoryProduct,
            status : status,
            brand : brand
        }
    )
    return product; 
}

async function getAllProducts(){
    let res = await conn.collection('products').find()
    return res.toArray(); 
}

async function getProduct(product){
    productId = new mongoDB.ObjectId(product);
    let res = await conn.collection('products').find({_id:productId})
    return res.toArray()[0]; 
}

async function deleteProduct(product){
    productId = new mongoDB.ObjectId(product);
    let res = await conn.collection('products').deleteOne({_id : productId})
    return res.toArray(); 
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

async function getAllCategoriesForType(type){
    let categories = await conn.collection('categories').find({type : type})
    return categories.toArray(); 
}

async function createSubcategory(name){

    let subcategory = await conn.collection('subcategories').insertOne(
        {
            name : name,
        }
    )
    return subcategory; 
}

async function getAllSubcategoriesForType(){
    let subcategories = await conn.collection('subcategories').find({type : type})
    return subcategories.toArray(); 
}

//createUserMongo("ADMINISTRADOR","jonat","1234","jonathanporrassandi@gmail.com","86398772", "506", "jonathan","andrey", "porras","sandi","21/10/2003", null,null,null);



