exports.home = function(req, res){
    var mongoose = require('mongoose');
    mongoose.connect('localhost', 'test');
    var schema = mongoose.Schema({ name:'string' });
    var Cat = mongoose.model('Cat', schema); //此时数据集名默认成为Cats    
    var kitty = new Cat({ name: 'Zildjian' });
    kitty.save(function (err) {
        if (err) // ...
        console.log('meow');
    });
    Cat.find({},function (err, docs) {  
        mongoose.connection.close();
        res.render('home', { docs:docs }); 
    }); 
};