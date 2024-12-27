const captainController = require("../controllers/captain.controller");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isNumeric()
      .withMessage("Capacity must be a number"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be either car or bike"),
  ],
  captainController.registerCaptain
);

module.exports = router;
