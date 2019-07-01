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
      const updateData = (data)=>{
        let newData = [];
        
        for(let i=0; i<data.length; i++){
          
           
          // console.log( `wyswietla :${data[i].item}  req.params.item = ${req.params.item} req.body = ${JSON.stringify(req.params.item)}`)
          if(data[i].item !== req.params.item.slice(2) ){
            newData.push(data[i].item);
            
           
          }
          
        }
        data=newData;
          return data;
      };
      data = updateData(data);
       
      
      
      res.json(data);
     
    });
        
}