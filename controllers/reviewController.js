const reviews = require('../Model/reviewModel')
const notif = require('../Model/notificationsModel')


exports.addReviewController = async (req, res) => {
    console.log(`Inside Add Review Controller`);
    console.log("Body:", req.body);
    const userTitle = "Review added Successfully"
    const orgTitle = "New Review received"
    try {
        const { eventname, eventId,userId, organizerId, stars, review } = req.body
        const newReview = await reviews.create({
            eventname, eventId,userId, organizerId, stars, review
        })
        const newNotif = await notif.create({
            type : "success", userTitle, orgTitle, Message: review, userId,organizerId
        })
        res.status(200).json({newReview,newNotif})
    }
    catch (error) {
        console.error("Add Review Error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}