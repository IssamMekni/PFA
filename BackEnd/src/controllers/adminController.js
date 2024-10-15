const sequelize = require("sequelize");

//const { Op } = require("sequelize"); // Sequelize Operators for queries
const {gt,lte,ne} = sequelize.Op;

const user = require("../models/user");
const lab = require("../models/lab");
const labResult = require("../models/labResult")

const bcrypt = require('bcrypt');


// CRUD Users

const getAllUsers = async (req,res) => {
    try{
        users = await user.findAll({where:{id:{[gt]:1}}});
        console.log(users);
        return res.json(users);
    }
    catch(error){
        console.log(error)
        return res.status(500).json(error);

    }


 }

const addOrUpdateUsers = async (req, res) => {
  const users = req.body.users;  // Assuming the users are sent in req.body.users

  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).json({ message: "Invalid input: No users provided." });
  }

  try {
    // Array to store response data
    const result = { added: [], updated: [], skipped: [] };

    for (let userData of users) {
      const { firstName, lastName,email, password } = userData;

      // Check if required fields are null or undefined
      if (!firstName || !lastName || !email || !password) {
        result.skipped.push({ user: userData, reason: "Required fields missing" });
        continue;  // Skip to the next user
      }

      // Find user by email
      const existingUser = await user.findOne({ where: { email } });
      //hashing password
      const hashedPassword = await bcrypt.hash(password, 10);

      if (existingUser) {
        // Update existing user
        await existingUser.update({ firstName, lastName,email,password:hashedPassword});
        result.updated.push(existingUser.toJSON()); // Add to updated list
      } else {
        // Create new user
        const newUser = await user.create({ firstName, lastName,email,password:hashedPassword});
        result.added.push(newUser.toJSON()); // Add to added list
      }
    }

    // Send success response
    return res.status(200).json({
      message: "Operation completed",
      added: result.added.length,
      updated: result.updated.length,
      skipped: result.skipped.length,
      result
    });

  } catch (error) {
    // Handle any errors
    console.error("Error processing users:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

const deleteUserByAttribute = async (req, res) => {
  const { attribute, value } = req.body; // Extract the attribute and value from the body

  try {
    // Check if attribute and value are provided
    if (!attribute || !value) {
      return res.status(400).json({ error: "Attribute and value are required." });
    }

    // Prepare the dynamic 'where' clause
    const whereClause = {};
    whereClause[attribute] = value; // Set dynamic key-value pair for the query

    // Perform the deletion
    const deletedRows = await user.destroy({
      where: whereClause  // Delete users based on the dynamic attribute and value
    });

    if (deletedRows > 0) {
      return res.status(200).json({ message: `${deletedRows} user(s) deleted successfully.` });
    } else {
      return res.status(404).json({ error: "No users found matching the given attribute." });
    }
  } catch (error) {
    console.error('Error deleting users:', error);
    return res.status(500).json({ error: "An error occurred while deleting users." });
  }
};




// CRUD labs
const getAllLabs = async (req,res) => {
    try{
        labs = await lab.findAll();
        console.log(labs);
        return res.json(labs);
    }
    catch(error){
        
        return res.status(500).json({
            message : "an error occured",
            error : error.message
        })

    }

};

const addOrUpdateLabs = async (req, res) => {
    const labs = req.body.labs;  // Assuming the users are sent in req.body.users
  
    if (!Array.isArray(labs) || labs.length === 0) {
      return res.status(400).json({ message: "Invalid input: No users provided." });
    }
  
    try {
      // Array to store response data
      const result = { added: [], updated: [], skipped: [] };
  
      for (let labData of labs) {
        const { name , location ,email, phoneNumber} = labData;
  
        // Check if required fields are null or undefined
        if (!name || !location || !email || !phoneNumber) {
          result.skipped.push({ lab: labData, reason: "Required fields missing" });
          continue;  // Skip to the next user
        }
  
        // Find user by email
        const existingLab = await lab.findOne({ where: { phoneNumber } });
        //hashing password
        //const hashedPassword = await bcrypt.hash(password, 10);
  
        if (existingLab) {
          // Update existing user
          await existingLab.update({  name , location ,email, phoneNumber});
          result.updated.push(existingUser.toJSON()); // Add to updated list
        } else {
          // Create new user
          const newLab = await lab.create({  name , location ,email, phoneNumber});
          result.added.push(newLab.toJSON()); // Add to added list
        }
      }
  
      // Send success response
      return res.status(200).json({
        message: "Operation completed",
        added: result.added.length,
        updated: result.updated.length,
        skipped: result.skipped.length,
        result
      });
  
    } catch (error) {
      // Handle any errors
      console.error("Error processing users:", error);
      return res.status(500).json({ message: "An error occurred", error: error.message });
    }
  };


const deleteLabByAttribute = async (req, res) => {
  const { attribute, value } = req.body; // Extract the attribute and value from the body

  try {
    // Check if attribute and value are provided
    if (!attribute || !value) {
      return res.status(400).json({ error: "Attribute and value are required." });
    }

    // Prepare the dynamic 'where' clause
    const whereClause = {};
    whereClause[attribute] = value; // Set dynamic key-value pair for the query

    // Perform the deletion
    const deletedRows = await lab.destroy({
      where: whereClause  // Delete users based on the dynamic attribute and value
    });

    if (deletedRows > 0) {
      return res.status(200).json({ message: `${deletedRows} lab(s) deleted successfully.` });
    } else {
      return res.status(404).json({ error: "No labs found matching the given attribute." });
    }
  } catch (error) {
    console.error('Error deleting labs:', error);
    return res.status(500).json({ error: "An error occurred while deleting labs." });
  }
};

  
// CRUD labResult

const getAllLabresults = async (req,res) => {
    try{
        labResults = await labResult.findAll();
        console.log(labResults);

        return res.json(labResults);
    }
    catch(error){
        console.log(error);
        return res.status(500).json(error)

    }
}

const addLabresults = async (req, res) => {
  const labResults = req.body.labResults;  // Assuming the users are sent in req.body.users

  if (!Array.isArray(labResults) || labResults.length === 0) {
    return res.status(400).json({ message: "Invalid input: No lab results provided." });
  }

  try {
    // Array to store response data
    const result = { added: [], skipped: [] };

    const validForignKey = async (userId, labId) => {
      try {
        const u = await user.findOne({
          where: { id: userId },  // Check if the user ID exists in the user table
        });
        const l = await lab.findOne({
          where: { id: labId },  // Check if the lab ID exists in the lab table
        });
    
        return (u !== null) && (l !== null);  // Return true if both user and lab are found
      } catch (error) {
        console.error('Error checking foreign keys:', error);
        return false;  // Return false if there's an error
      }
    };

    for (let labResultData of labResults) {
      const { date, testType, result: testResult, filepath, labId, userId } = labResultData;

      // Check if required fields are missing
      if (!date || !testType || !labId || !userId) {
        result.skipped.push({ labResult: labResultData, reason: "Required fields missing" });
        continue;  // Skip to the next lab result
      }

      // Validate the foreign keys (userId and labId)
      const isValidForeignKey = await validForignKey(userId, labId);
      if (!isValidForeignKey) {
        result.skipped.push({ labResult: labResultData, reason: "Invalid labId or userId" });
        continue;  // Skip to the next lab result
      }

      // Create new lab result
      const newLabResult = await labResult.create({
        date,
        testType,
        result: testResult,
        filepath,
        labId,
        userId
      });

      result.added.push(newLabResult.toJSON());  // Add to the added list
    }

    // Send success response
    return res.status(200).json({
      message: "Operation completed",
      added: result.added.length,
      skipped: result.skipped.length,
      result
    });

  } catch (error) {
    // Handle any errors
    console.error("Error processing lab results:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};


const deleteLabresultByAttribute = async (req, res) => {
  const { attribute, value } = req.body; // Extract the attribute and value from the body

  try {
    // Check if attribute and value are provided
    if (!attribute || !value) {
      return res.status(400).json({ error: "Attribute and value are required." });
    }

    // Prepare the dynamic 'where' clause
    const whereClause = {};
    whereClause[attribute] = value; // Set dynamic key-value pair for the query

    // Perform the deletion
    const deletedRows = await labResult.destroy({
      where: whereClause  // Delete users based on the dynamic attribute and value
    });

    if (deletedRows > 0) {
      return res.status(200).json({ message: `${deletedRows} labresult(s) deleted successfully.` });
    } else {
      return res.status(404).json({ error: "No labresults found matching the given attribute." });
    }
  } catch (error) {
    console.error('Error deleting labresults:', error);
    return res.status(500).json({ error: "An error occurred while deleting labresults." });
  }
};


 module.exports = {
    getAllUsers,addOrUpdateUsers,deleteUserByAttribute,
    getAllLabs,addOrUpdateLabs,deleteLabByAttribute,
    getAllLabresults,addLabresults,deleteLabresultByAttribute,
}
