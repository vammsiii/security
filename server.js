/*var express = require('express');
var app = express();

app.get('/', function(request, respond)  {
  respond.send("Hello World!");
});
app.listen(9000,()=> console.log("API Started Listening"));*/


/*var express = require('express');
var app = express();

app.get('/', function(request, respond)  {
  respond.send("Hello World!");
});
app.get('/time',function(request, respond) {
  var time = new Date().toLocaleTimeString();
  respond.send(`Time Is:  + ${time}`);
})
app.get('/date',function(request, respond) {
  var date = new Date().toLocaleDateString();
  respond.send(`Date Is:  + ${date}`);
})
app.listen(9000,()=> console.log("API Started Listening"));*/

/*var express = require('express');
var app = express();

app.get('/', function(request, respond)  {
  respond.send("Hello World!");
});
app.get('/square/:n',function(request, respond) {
  var n = parseInt(request.params.n);
  respond.send(`Square of ${n} is ${n*n}`);
})
app.get('/addition/:a/:b',function(request, respond) {
  var a = Number(request.params.a);
  var b = Number(request.params.b);
  var c = a + b;
  respond.send(`Addition of ${a} and ${b} is ${c}`);
})

app.listen(9000,()=> console.log("API Started Listening"));*/


const express = require('express');
const app = express();
app.use(express.json());//to read json data from request
//in memory array(act like ds) to store users
let users=[
  {id:1, name:"John", age:30},
  {id:2, name:"Jane", age:25},
  {id:3, name:"Doe", age:35}
];
//post /users--insert
app.post('/users', (request, respond) => {

  const newUsers = request.body;

  // Validate if body is an array
  if (!Array.isArray(newUsers)) {
    return respond.status(400).send("Please send an array of users");
  }

  let lastId = users.length > 0 ? users[users.length - 1].id : 0;

  const addedUsers = newUsers.map(user => {
    lastId++;

    const newUser = {
      id: lastId,
      name: user.name,
      age: user.age
    };

    users.push(newUser);
    return newUser;
  });

  respond.status(201).json(addedUsers);
});
//////////////////////read////////////////////////
//get users
app.get("/users",(request, respond) => {
  respond.send(users);
});
//get user by id
app.get("/users/:id",(request, respond) => {
  const user = users.find(u => u.id == request.params.id);
  if (!users) return respond.status(404).send("User Not Found");
  respond.send(user);
});
//////////////////////update////////////////////////
app.put("/users/:id",(request, respond) => {
  const user = users.find(u => u.id == request.params.id);
  if (!users) return respond.status(404).send("User Not Found");
  user.name = request.body.name;
  user.age = request.body.age;
  respond.send(user);
});
//////delet////////
app.delete("/users/:id",(request, respond) => {
  users=users.filter(u => u.id != request.params.id);
  respond.send("User Deleted");
});
app.listen(9000,()=>{
  console.log("API Started Listening");
});