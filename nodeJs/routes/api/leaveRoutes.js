const express = require("express");
const router = express.Router();

const getLeaveController = require("../../controllers/getLeaveController");
const leaveController = require("../../controllers/leaveController");
const ROLES_LIST = require("../../configs/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.post("/create-leave", verifyRoles(ROLES_LIST.User), leaveController.createLeave);

router.put("/update-leave/:leaveId/:leaveStatus", verifyRoles(ROLES_LIST.Admin), leaveController.updateLeave);
router.get("/get-all-leave", verifyRoles(ROLES_LIST.Admin), getLeaveController.getLeaves);

router.get("/:type/:userId", verifyRoles(ROLES_LIST.User), getLeaveController.getUserLeaves);
router.post("/:leaveId", verifyRoles(ROLES_LIST.User), leaveController.deleteLeave);


module.exports = router;