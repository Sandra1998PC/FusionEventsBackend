const users = require("../Model/userModel");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// user register
exports.registerController = async (req, res) => {
    console.log(`Inside Register function`);
    try {
        console.log(req.body)
        const { username, email, phonenumber, password, role } = req.body

        console.log(username, email, phonenumber, password, role)
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: "User Already Exists!!! Please Login!!!"
            });
        }
        else {
            const encrypytedPswd = await bcrypt.hash(password, 10)
            console.log(encrypytedPswd);

            const newUser = await users.create({
                username, email, phonenumber, password: encrypytedPswd, role
            })
            res.status(201).json(newUser)
        }
    }
    catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

// user login
exports.loginController = async (req, res) => {
    console.log(`Inside login function`);
    try{const { email, password } = req.body
    const existingUser = await users.findOne({ email: email })
    console.log(existingUser);
    if (existingUser) {
        const isPswdMatch = await bcrypt.compare(password, existingUser.password)
        console.log(isPswdMatch);
        if (isPswdMatch) {
            const token = jwt.sign(
                {
                    email: existingUser.email,
                    id: existingUser._id,
                    role: existingUser.role
                },
                process.env.secretKey
            )
            res.status(200).json({ existingUser, token })
        } else {
            res.status(409).json({ message: `Invalid Credentials!!!` })
        }
    } else {
        res.status(400).json({ message: `Account doesnot Existis!!! Please Resigister!!!` })
    }}
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

// update Participant profile
exports.updateParticipantProfileController = async (req, res) => {
    try {
        const id = req.userId
        const { username, phonenumber, password, location, website, bio, profileImage, email } = req.body
        const uploadImage = req.file ? req.file.filename : profileImage

        console.log("id : ", id)

        if (password || password !== "") {
            const updateData = {
                username, bio, email, phonenumber, password, website, location, profileImage: uploadImage
            }
            updateData.password = await bcrypt.hash(password, 10)
            const updateUser = await users.findByIdAndUpdate({ _id: id }, updateData, { new: true })
            res.status(200).json(updateUser)
        }
        else {
            const updateData2 = {
                username, bio, email, phonenumber, website, location, profileImage: uploadImage
            }
            const updateUser2 = await users.findByIdAndUpdate({ _id: id }, updateData2, { new: true })
            res.status(200).json(updateUser2)
        }


    } catch (err) {
        res.status(500).json({ message: `Something Went Wrong`, error: err.message })
    }
}

// update Organizer profile
exports.updateOrganizerProfileController = async (req, res) => {
    try {
        const id = req.userId
        const { username, phonenumber, password, location, website, bio, profileImage, email, organization } = req.body
        const uploadImage = req.file ? req.file.filename : profileImage

        console.log("id : ", id)

        if (password || password !== "") {
            const updateData = {
                username, bio, email, phonenumber, password, location, website, organization, profileImage: uploadImage
            }
            updateData.password = await bcrypt.hash(password, 10)
            const updateUser = await users.findByIdAndUpdate({ _id: id }, updateData, { new: true })
            res.status(200).json(updateUser)
        }
        else {
            const updateData2 = {
                username, bio, email, phonenumber, location, website, organization, profileImage: uploadImage
            }
            const updateUser2 = await users.findByIdAndUpdate({ _id: id }, updateData2, { new: true })
            res.status(200).json(updateUser2)
        }


    } catch (err) {
        res.status(500).json({ message: `Something Went Wrong`, error: err.message })
    }
}

// update Admin profile
exports.updateAdminProfileController = async (req, res) => {
    try {
        const id = req.userId
        const { username, phonenumber, password, location, profileImage, email } = req.body
        const uploadImage = req.file ? req.file.filename : profileImage

        console.log("id : ", id)

        if (password || password !== "") {
            const updateData = {
                username, email, phonenumber, password, location, profileImage: uploadImage
            }
            updateData.password = await bcrypt.hash(password, 10)
            const updateUser = await users.findByIdAndUpdate({ _id: id }, updateData, { new: true })
            res.status(200).json(updateUser)
        }
        else {
            const updateData2 = {
                username, email, phonenumber, location, profileImage: uploadImage
            }
            const updateUser2 = await users.findByIdAndUpdate({ _id: id }, updateData2, { new: true })
            res.status(200).json(updateUser2)
        }

    } catch (err) {
        res.status(500).json({ message: `Something Went Wrong`, error: err.message })
    }
}

exports.getAllUsersController = async (req, res) => {
    const searchKey = req.query.search || "";
    try {
        console.log("Inside Get All Users Controller");
        const allUsers = await users.find({ username: { $regex: searchKey, $options: "i" } });
        console.log("Users found:", allUsers);
        console.log("Number of users:", allUsers.length);
        res.status(200).json({ allUsers: allUsers });
    } catch (error) {
        console.error("Error getting all users:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

exports.updateUserStatusController = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedUser = await users.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: `User ${status.toLowerCase()} successfully`,
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

//delete User
exports.deleteUserController = async (req,res) => {
    try{
        const { id } = req.params;
        const deleteUser = await users.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully", data: deleteUser });
    }
    catch(error){
        console.log('Error deleting user:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}