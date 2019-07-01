const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


//connect to db
const url = 'mongodb://test:test@todoapp-shard-00-00-bsb8g.mongodb.net:27017,todoapp-shard-00-01-bsb8g.mongodb.net:27017,todoapp-shard-00-02-bsb8g.mongodb.net:27017/test?ssl=true&replicaSet=toDoApp-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(url,{ useNewUrlParser: true });


//schema


let todoSchema = new mongoose.Schema({
  item: String
});

// model

let Todo = mongoose.model('Todo',todoSchema );

// let itemOne = Todo({item:"get flowers"}).save(function(err){
//   if(err){
//   console.log(err)
//    }else{
//      console.log('item saved')
//    }
    
// });


// basic data
// let data = [{item:"learn sth new"},{item:"learn more"},{item:"and more!"}];


module.exports = (app)=>{
    app.get('/', function (req, res) {
      //getting data from db

      Todo.find({},function(err,data){
        res.render('todo',{todo:data});
      });
        
      });

    app.post('/todo', urlencodedParser, function (req, res) {

      //get data from view and add to db

      let newTodo = Todo(req.body).save(function(err,data){
        if(err)throw err;
        res.json(data);
      });
      
      });

  
      
  app.delete('/todo/:item', function (req, res) {
      //delete requested item from db

      Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
      }); 
    
    });
  
        
};


