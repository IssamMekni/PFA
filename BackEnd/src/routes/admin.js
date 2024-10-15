const express = require("express");
const router = express.Router();
const {
     getAllUsers , addOrUpdateUsers,deleteUserByAttribute,
     getAllLabs, addOrUpdateLabs,deleteLabByAttribute,
     getAllLabresults,addLabresults,deleteLabresultByAttribute,
    } = require("../controllers/adminController");



// CRUD Users


router.get("/users",getAllUsers)
router.post("/users",addOrUpdateUsers)
// router.put("/users/:id")
router.delete("/users",deleteUserByAttribute)


// CRUD Labs

router.get("/labs",getAllLabs)
router.post("/labs",addOrUpdateLabs)
// router.put("/labs/:id")
router.delete("/labs/",deleteLabByAttribute)


// CRUD LabResults

router.get("/lab-results",getAllLabresults)
router.post("/lab-results",addLabresults)
// router.put("/lab-results/:id")
router.delete("/lab-results",deleteLabresultByAttribute)


module.exports = router;
