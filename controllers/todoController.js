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

let itemOne = Todo({item:"get flowers"}).save(function(err){
  if(err){
  console.log(err)
   }else{
     console.log('item saved')
   }
    
});


// basic data
let data = [{item:"learn sth new"},{item:"learn more"},{item:"and more!"}];


module.exports = (app)=>{
    app.get('/todo', function (req, res) {
        res.render('todo',{todo:data});
      });

    app.post('/todo', urlencodedParser, function (req, res) {
      data.push(req.body);
      res.json(data);
      });

  
      
  app.delete('/todo/:item', function (req, res) {
      
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') != req.params.item;
    });
    res.json(data);
    });
  
        
};


