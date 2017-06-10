
const express     = require('express');
const app         = express();
//const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const cors        = require('cors');
//const latency       = require('latency');

const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config'); // get our config file
const User   = require('./app/models/user'); // get our mongoose model





// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8080; // used to create, sign, and verify tokens

mongoose.connect(config.database,config.options);
let  connection = mongoose.connection;
     connection.on('error', console.error.bind(console, 'connection error:'));
     connection.once('open', function() {
         console.log('connected');
});
app.set('url',config.url);
app.set('host',config.host);
app.set('accessSecret', config.accessSecret);  // accessSecret variable
app.set('refreshSecret',config.refreshSecret); // refreshSecret variable

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cors());

app.use(morgan('dev'));


// =======================
// Routes =========
// =======================

//-----------------SIGNUP-------------//
app.post('/signup', function(req, res) {
    let postedData = '';
    req.on('data',(data)=>{
        postedData += data.toString();
        postedData = JSON.parse(postedData);
        console.log(postedData);
    });
    req.on('end',()=>{

        User.findOne({
            id:postedData.id

        },(err,user)=>{

            if(err) throw err;

            if(!user){
                let accessToken = jwt.sign(postedData, app.get('accessSecret'),
                    {
                        expiresIn: 60*10
                    }
                );
                let refreshToken = jwt.sign(postedData,app.get('refreshSecret'));
                let newUser = new User ({
                    id: postedData.id,
                    password: postedData.password,
                    accessToken:accessToken,
                    refreshToken:refreshToken
                });

                newUser.save((err)=>{
                    if(err) throw err;

                    console.log('User saved successfully');
                    res.send(JSON.stringify({success:true,accessToken:accessToken,refreshToken:refreshToken}))

                })
            }
            else {
                res.send({success:false,message:'Validation error'})
            }
        });


    })

});
//----------------- SIGNIN --------------//
app.post('/signin', function(req, res) {
    let newUser = '';
    req.on('data',(data)=>{
       newUser += data.toString();
       newUser  = JSON.parse(newUser);
    });
    req.on('end',()=>{
        console.log(newUser);
        User.findOne({
            id: newUser.id,
            password:newUser.password
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.send(JSON.stringify({ success: false, message: 'Authentication failed. User not found.' }));
            } else if (user) {

                if (user.password != newUser.password) {
                    res.send(JSON.stringify({ success: false, message: 'Authentication failed. Wrong password.' }));
                } else {

                    if(newUser.accessToken){
                        jwt.verify(newUser.accessToken,app.get('accessSecret'),(err,decoded)=>{
                            if(err){
                                return res.send(JSON.stringify({success:false,message:'Failed to authenticate token'}));
                            }
                            else if(user.accessToken==newUser.accessToken) {
                                let newRefreshToken = jwt.sign(newUser,app.get('refreshSecret'),
                                    {
                                        expiresIn: 60*10
                                    }
                                );
                                user.update({refreshToken:newRefreshToken},(err)=>{
                                    if (err) throw err;
                                });
                                res.send(JSON.stringify({success:true,refreshToken:newRefreshToken}))
                            }
                        })
                    } else {
                        res.status(403).send(JSON.stringify({success:false,message:'No token provided'}))
                    }
                }
            }
        });
    });
});
//------------------LOGOUT--------------//
app.get('/logout/:all',function (req,res) {
});
//----------------INFO-----------------//
app.get('/info',function (req,res) {

    res.send(JSON.stringify({id:req.id,password:req.password}))
});
//------------------LATENCY------------//
//app.get('/latency',function (req,res) {
// latency(app.get('url'), 50).then(function (results) {
//     let res = {
//         'Url': results.url,
//         'Request count': results.count,
//         'Average': results.mean,
//         'Standard deviation': results.sd,
//         '95th percentile': results.p95,
//         '99th percentile:': results.p99
//     };
//     res.send(JSON.stringify(res));
// })
//});
app.listen(port);
console.log('//localhost:' + port);
