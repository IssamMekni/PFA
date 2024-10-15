// For Update (U) operations using Sequelize with PostgreSQL, you can update existing records in the database. Sequelize provides the update() method, which allows you to modify one or more records based on specific conditions. Here are detailed examples of how to use Sequelize for updating records.
// 1. Update a Single User by ID

// The simplest update is to modify a single record based on its primary key (usually id).
// Example: Update a User’s Name and Age by ID

// javascript

const updateUserById = async (id, newName, newAge) => {
  try {
    const updatedRows = await User.update(
      { name: newName, age: newAge },  // Fields to update
      { where: { id } }  // Condition (where clause)
    );

    if (updatedRows[0] > 0) {
      console.log(`User with ID ${id} updated successfully.`);
    } else {
      console.log(`User with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Call the function
// updateUserById(1, 'New Name', 26);

// In this example:

//     The update() method is used to update the name and age fields of the user with a specific id.
//     The where clause ensures only the user with the given id is updated.
//     updatedRows[0] returns the number of rows that were affected (updated).

// 2. Update Multiple Users Based on Conditions

// You can update multiple users that meet a condition in a single query.
// Example: Update Users Older Than 30

// javascript

const updateUsersOlderThan30 = async (newAge) => {
  try {
    const updatedRows = await User.update(
      { age: newAge },  // Field to update
      { where: { age: { [Op.gt]: 30 } } }  // Condition: age > 30
    );

    console.log(`${updatedRows[0]} users updated successfully.`);
  } catch (error) {
    console.error('Error updating users:', error);
  }
};

// Call the function
// updateUsersOlderThan30(35);

// In this case, every user whose age is greater than 30 will have their age field updated to 35. The Op.gt operator is used for the "greater than" condition.
// 3. Update a User and Return the Updated Record

// Sequelize’s update() method only returns the number of rows affected, but you can retrieve the updated user data by using findOne() after the update.
// Example: Update a User’s Email and Return the Updated Record

// javascript

const updateUserEmail = async (id, newEmail) => {
  try {
    // Update the user's email
    const updatedRows = await User.update(
      { email: newEmail },
      { where: { id } }
    );

    if (updatedRows[0] > 0) {
      // Fetch the updated record
      const updatedUser = await User.findOne({ where: { id } });
      console.log('Updated user:', updatedUser.toJSON());
    } else {
      console.log(`User with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Call the function
// updateUserEmail(1, 'newemail@example.com');

// Here, after updating the user, we fetch the updated record using findOne() and return it to see the changes applied.
// 4. Update with Conditions and Returning the Updated Rows (PostgreSQL specific)

// PostgreSQL allows the RETURNING keyword, which Sequelize also supports. This lets you update rows and return the updated data directly.
// Example: Update Users Older Than 25 and Return the Updated Rows

// javascript

const updateAndReturnUsers = async () => {
  try {
    const [affectedRows, updatedUsers] = await User.update(
      { age: 28 },
      { 
        where: { age: { [Op.gt]: 25 } },  // Update where age > 25
        returning: true  // PostgreSQL specific option to return updated rows
      }
    );

    console.log(`Updated ${affectedRows} users.`);
    console.log('Updated users:', updatedUsers);
  } catch (error) {
    console.error('Error updating users:', error);
  }
};

// Call the function
// updateAndReturnUsers();

// This example:

//     Updates all users older than 25, setting their age to 28.
//     The returning: true option allows PostgreSQL to return the updated rows directly.
//     updatedUsers contains the updated rows.

// 5. Update Only if Certain Fields Are Not Null or Undefined

// You might want to update a user only if certain fields have valid values (not null or undefined).
// Example: Conditionally Update a User Only if Data Is Valid

// javascript

const conditionalUpdateUser = async (id, newName, newEmail) => {
  try {
    // Skip update if required fields are missing
    if (!newName || !newEmail) {
      console.log('Missing fields, user not updated.');
      return;
    }

    const updatedRows = await User.update(
      { name: newName, email: newEmail },
      { where: { id } }
    );

    if (updatedRows[0] > 0) {
      console.log(`User with ID ${id} updated successfully.`);
    } else {
      console.log(`User with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Call the function
// conditionalUpdateUser(1, 'Valid Name', 'validemail@example.com');

// In this function:

//     The update only proceeds if both newName and newEmail are provided. If any required field is missing, the update is skipped.

// 6. Update with Relations (Associations)

// If you have associated models (e.g., a User belongs to Post), you can update records in relation to each other.
// Example: Update User's Posts

// Assume each User has many Posts. Here’s how you can update a user's posts based on some conditions:

// javascript

const updateUserPosts = async (userId, newPostTitle) => {
  try {
    const user = await User.findByPk(userId, { include: [Post] });

    if (user) {
      await Post.update(
        { title: newPostTitle },  // Update title of all posts
        { where: { userId } }  // Condition to update only posts from this user
      );

      console.log(`All posts of user with ID ${userId} updated successfully.`);
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Error updating posts:', error);
  }
};

// Call the function
// updateUserPosts(1, 'New Title for All Posts');

// This example updates all posts for a specific user by updating the title of the posts associated with that user.