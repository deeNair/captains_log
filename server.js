require('dotenv').config();
const express =require('express');
const app= express();
const connectTodb=require('./config/db');
const logs = require('./models/logs');

app.set('view engine','jsx');
app.engine('jsx',require('jsx-view-engine').createEngine())
app.use((req,res,next)=>{
    console.log(req.url);
    next();//runs next middleware
  })
  //req.body parse
app.use(express.urlencoded({extended:false}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
     res.send('hello')
})

app.get('/logs',(req,res)=>{
    logs.find({},(error,allLogs)=>{
         res.render('./logs/Index',{logs1:allLogs})
    })

    //res.render('./logs/Index');
})


app.post('/logs',(req,res)=>{
    //console.log(req.body);
    //res.send('recieved'); 
    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken=true;
        }else{
        req.body.shipIsBroken=false;
       }
       //console.log(req.body);
    //res.send(req.body);
   /* logs.create(req.body,(error,createdLog)=>{
        res.redirect(`/logs/${createdLog._id}`);
    })*/

    logs.create(req.body).then (log=>{
        res.redirect('./logs')
       
    }).catch((error)=>{
        console.error(error);
    })
})
app.get('/logs/new',(req,res)=>{
    res.render('./logs/New');
})

//return edit form
app.get('/logs/:id/edit',(req,res)=>{
    logs.findById(req.params.id,(error,foundShip)=>{
        if(!error){
            res.render('logs/Edit',{logs3:foundShip})
        }else{
              res.send({msg:error.message});
        }
    })
})

app.put('/logs/:id',(req,res)=>{
    if(req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken=true;
        }else{
        req.body.shipIsBroken=false;
       }
       logs.findByIdAndUpdate(req.params.id,req.body,{new:true},(error,updatedShip)=>{
        //res.send(updatedFruit);
        res.redirect(`/logs/${req.params.id}`)
       })

})
//seed routes
app.get('/logs/seed', (req, res)=>{
    Fruit.create([
        {
            title:'ship1',
            entry:'sailprincess1',
            readyToEat:true
        },
        {
            title:'ship2',
            entry:'sailprincess2',
            readyToEat:false
        },
        {
            title:'ship3',
            entry:'sailprincess3',
            readyToEat:true
        }
    ], (err, data)=>{
        res.redirect('./logs');
    })
  });

  app.get('/logs/:id',(req,res)=>{
    console.log(req.params);
    //res.render('./logs/Show');
    logs.findById(req.params.id,(error,foundShip)=>{
        res.render('logs/Show',{logs2:foundShip});
    })
  })

//=====delete
app.delete('/logs/:id', (req, res) => {
    //res.send('deleting fruit...');
    logs.findByIdAndRemove(req.params.id,(error,deletedShip)=>{
      //res.send(deletedFruit);
      res.redirect('/logs');
    })
  })

app.listen(4000,function(){
    console.log(`listening to port 4000`);
    connectTodb(); 
})