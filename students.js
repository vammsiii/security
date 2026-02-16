const express = require('express');
const app = express();

app.use(express.json()); // to read json data from request

let users = [
  { id: 1, name: "vamsii", age: 25 },
  { id: 2, name: "denni", age: 22 }
];

//////////////////////create////////////////////////
// post /users -- insert
app.post('/users',(request, respond) =>{
  const newUser={
    id:users.length + 1,
    name: request.body.name,
    age:request.body.age
  };
  users.push(newUser);
  respond.status(201).json(newUser);
});

//////////////////////read////////////////////////
// get all users
app.get("/users", (request, respond) => {
  respond.send(users);
});

// get user by id
app.get("/users/:id", (request, respond) => {
  const user = users.find(u => u.id == request.params.id);

  if (!user) return respond.status(404).send("User Not Found");

  respond.send(user);
});

//////////////////////update////////////////////////
app.put("/users/:id", (request, respond) => {
  const user = users.find(u => u.id == request.params.id);

  if (!user) return respond.status(404).send("User Not Found");

  user.name = request.body.name;
  user.age = request.body.age;

  respond.send(user);
});

//////////////////////delete////////////////////////
app.delete("/users/:id", (request, respond) => {
  users = users.filter(u => u.id != request.params.id);

  respond.send("User Deleted");
});

app.listen(3000, () => {
  console.log("API Started Listening on port 3000");
});
