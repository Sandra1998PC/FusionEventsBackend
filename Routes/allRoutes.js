const express = require("express")
const { registerController, loginController, updateParticipantProfileController, updateOrganizerProfileController, updateAdminProfileController, getAllUsersController } = require("../controllers/userController")
const jwtAuthMiddleware = require("../Middleware/jwtAuthMiddleware")
const multerMiddleware = require("../Middleware/multerMiddleware")
const { addEventController, getAllEventssController, viewEventController, paymentController, viewEventRegisterController, removeTicketController, getAllEventsByIdController, updateEventDataController, deleteEventController } = require("../controllers/eventController")
const { addReviewController } = require("../controllers/reviewController")
const { viewUserNotifController, viewOrganizerNotifController } = require("../controllers/notificationsController")

const router = new express.Router()

// register
router.post("/register", registerController)

// login
router.post("/login", loginController)

router.put("/participant/profileupdate", jwtAuthMiddleware, multerMiddleware.single("profileImage"), updateParticipantProfileController)

router.put("/organizer/profileupdate", jwtAuthMiddleware, multerMiddleware.single("profileImage"), updateOrganizerProfileController)

router.put("/admin/profileupdate", jwtAuthMiddleware, multerMiddleware.single("profileImage"), updateAdminProfileController)

// Add Event
router.post("/addEvent", jwtAuthMiddleware, multerMiddleware.single("bannerImage"), addEventController)

//get all events
router.get("/getAllEvents", jwtAuthMiddleware, getAllEventssController)

router.get('/view/:id/event', jwtAuthMiddleware, viewEventController);

router.post('/review', jwtAuthMiddleware, addReviewController);

router.get('/user/:id/notifications', jwtAuthMiddleware, viewUserNotifController);

router.get('/organizer/:id/notifications', jwtAuthMiddleware, viewOrganizerNotifController);

router.post('/payment', jwtAuthMiddleware, paymentController);

router.get('/user/:id/tickets', jwtAuthMiddleware, viewEventRegisterController);

router.delete("/remove/:id/ticket", jwtAuthMiddleware, removeTicketController);

router.get("/getAllUsers", jwtAuthMiddleware, getAllUsersController)

//get event by ID
router.get("/getEvent/:id", jwtAuthMiddleware, getAllEventsByIdController)

router.put("/organizer/eventupdate/:id", jwtAuthMiddleware, multerMiddleware.single("bannerImage"), updateEventDataController)

router.delete("/delete/:id/event", jwtAuthMiddleware, deleteEventController);

module.exports = router