const events = require('../Model/eventModel')
const eventRegister = require('../Model/eventRegisterModel')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.addEventController = async (req, res) => {
    console.log(`Inside Add Event Controller`);
    console.log("Body:", req.body);
    console.log("Files:", req.file);
    try {
        const { eventname, category, description, venue, date, time, price, seats, bannerImage, organizername, organization, organizerId } =
            req.body
        console.log(eventname, category, description, venue, date, time, price, seats, bannerImage, organizername, organization, organizerId);

        const uploadImage = req.file ? req.file.filename : bannerImage
        const organizerEmail = req.payload

        const existingBook = await events.findOne({ eventname, organizername })
        if (existingBook) {
            res.status(409).json(`Event Already Exists!!! Operaction Failed!!!`)
        } else {
            const newEvent = await events.create({
                eventname, category, description, venue, date, time, price, seats, bannerImage: uploadImage, organizername, organization, organizerId, organizerEmail
            })
            res.status(200).json(newEvent)
        }
    } catch (error) {
        console.error("Add Event Error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

exports.getAllEventssController = async (req, res) => {
    const searchKey = req.query.search || "";
    try {
        console.log('Inside Get All Books Controller');
        const allEvents = await events.find({ eventname: { $regex: searchKey, $options: "i" } })
        res.status(200).json(allEvents);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllEventsByIdController = async (req, res) => {
    const { id } = req.params;
    console.log("ID received:", id);
    try {
        const allEventsById = await events.find({
            organizerId: id
        });
        console.log("Events found:", allEventsById);
        res.status(200).json(allEventsById);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

exports.viewEventController = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('Inside View Event Controller');
        const viewEvent = await events.findById(id);
        res.status(200).json(viewEvent);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.paymentController = async (req, res) => {
    try {
        const { eventname, eventId, userId, organizerId, name, email, phone, price, quantity } = req.body
        const line_items = [{
            price_data: {
                currency: "inr",
                product_data: {
                    name: eventname,
                    description: `${organizerId}, ${name}`,
                    metadata: {
                        title: eventname,
                        author: organizerId,
                        price: price
                    }
                },
                unit_amount: Math.round(price * 100)
            },
            quantity: 1
        }]
        // stripe
        const session = await stripe.checkout.sessions.create({
            success_url: "http://localhost:5173/payment/success",
            cancel_url: "http://localhost:5173/payment/error",
            line_items,
            mode: "payment",
            payment_method_types: ["card"]
        })
        console.log(session);
        if (session.url) {
            const newData = await eventRegister.create({
                eventname, eventId, userId, organizerId, name, email, phone, quantity
            })
            const updateData = await events.findByIdAndUpdate(
                eventId,
                { $inc: { ticketsSold: quantity } },
                { new: true }
            );
        }
        res.status(200).json({ checkoutURL: session.url });
    }
    catch (error) {
        console.error('Error Payment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.viewEventRegisterController = async (req, res) => {
    const { id } = req.params;
    try {
        const viewRegEvents = await eventRegister.find({ userId : id });
        res.status(200).json(viewRegEvents);
    } catch (error) {
        console.error('Error fetching Event Registers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// delete user added book
exports.removeTicketController = async (req, res) => {
    try {
        const { id } = req.params;
        const removeTicket = await eventRegister.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "Ticket removed successfully", data: removeTicket });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// update EventData
exports.updateEventDataController = async (req,res) => {
    try {
         const { id } = req.params;
        const { eventname, category, description, venue, date, time, price, seats, status, bannerImage } = req.body;
        const uploadImage = req.file ? req.file.filename : bannerImage;
        const updateData = {
            eventname, category, description, venue, date, time, price, seats, status, bannerImage: uploadImage
        };
        const updatedEvent = await events.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ message: "Event updated successfully", data: updatedEvent });
    }
    catch (error) {
        console.log('Error updating event:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//delete Event
exports.deleteEventController = async (req,res) => {
    try{
        const { id } = req.params;
        const deleteEvent = await events.findByIdAndDelete(id);
        res.status(200).json({ message: "Event deleted successfully", data: deleteEvent });
    }
    catch(error){
        console.log('Error deleting event:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}