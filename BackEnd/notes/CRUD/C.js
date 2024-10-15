// Now, let's create a new user using the create() method.
// Example 1: Basic Create
User.create({
    name: 'Issam',
    email: 'issam@example.com',
    age: 25
  }).then(user => {
    console.log('User created:', user.toJSON());
  }).catch(error => {
    console.error('Error creating user:', error);
  });


// Example 2: Create with Optional Fields

User.create({
    name: 'Amir',
    email: 'amir@example.com'
  }).then(user => {
    console.log('User created with default age:', user.toJSON());
  }).catch(error => {
    console.error('Error creating user:', error);
  });


// Example 3: Create Multiple Records

User.bulkCreate([
    { name: 'Sarah', email: 'sarah@example.com', age: 30 },
    { name: 'John', email: 'john@example.com', age: 22 },
    { name: 'Lina', email: 'lina@example.com' }, // no age, defaults to null
  ]).then(users => {
    console.log('Users created:', users.map(user => user.toJSON()));
  }).catch(error => {
    console.error('Error creating multiple users:', error);
  });
  

// 