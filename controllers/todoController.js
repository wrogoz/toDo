const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

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
        return todo.item.replace(/ /g, '-') !==req.params.item;
      });
      res.json(data);
    });
        
}