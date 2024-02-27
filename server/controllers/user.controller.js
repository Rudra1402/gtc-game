require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const nodeMailer = require('nodemailer');

const secretKey = process.env.SECRET_KEY;

const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'bankingapp.ba5@gmail.com',
        pass: process.env.EMAIL_PASS
    }
})

const sendVerificationEmail = (user, verificationLink) => {
    const mailOptions = {
        from: 'bankingapp.ba5@gmail.com',
        to: user?.email,
        subject: 'Email Verification',
        html: `
            <div style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #333;">Welcome to GuessTheColor, ${user?.firstName}!</h1>
                </div>
                <div style="margin-bottom: 20px; color: #555;">
                    <p>Please verify your email to play the game and see yourself top the leaderboard.</p>
                    <p>Happy gaming!</p>
                </div>
                <div style="text-align: center;">
                    <a href=${verificationLink} style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;" 
                    target="_blank">Verify Email</a>
                </div>
                <div style="text-align: center; color: #777; font-size: 12px;">
                    <p>This email was sent by GuessTheColor. If you did not sign up for an account, please ignore this email.</p>
                </div>
            </div>
        </div>
        `
    }

    transporter
        .sendMail(mailOptions)
        .then((info) => {
            console.log('Email sent:', info.response);
        })
        .catch((error) => {
            console.error('Error sending email:', error);
        });

}

const verifyToken = async (req, res) => {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
        return res.status(404).json({ message: 'Verification token not found.' });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully.' });
}

const registerUser = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered!' });
        }

        const checkUsername = await User.findOne({ username });
        if (checkUsername) {
            return res.status(400).json({ message: 'Username already taken!' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, firstName, lastName, email, password: hashedPassword });
        const verificationToken = uuidv4();
        user.verificationToken = verificationToken;
        await user.save();

        res.status(201).json({ message: 'User registered successfully. Please verify your email!' });
        sendVerificationEmail(user, `http://localhost:5173/verify/${verificationToken}`)
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during registration' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.json({ message: 'Email doesn\'t exist!' })
        }

        const checkPass = await bcrypt.compare(password, user.password);

        if (!checkPass) {
            return res.status(401).json({ error: 'Incorrect password!' });
        }

        if (!user.isVerified) {
            return res.json({ message: 'Please verify your account!', isVerified: false });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        let loggedInUser = {
            id: user._id,
            token: token,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified
        }

        res.status(200).json({ message: 'Login successful', user: loggedInUser, isVerified: true });
    } catch (error) {
        res.status(500).json({ message: 'Login error occurred!' });
    }
}

const getUserScore = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(401).json({ message: 'User not found!' })
        }

        res.status(200).json({ scores: { currentScore: user.currentScore, highestScore: user.highestScore } })

    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching user!' });
    }
}

const updateScore = async (req, res) => {
    try {
        const { id, score } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.json({ message: 'User doesn\'t exist!' })
        }

        // user.currentScore = score;
        if (user.highestScore < score) {
            user.currentScore = user.highestScore;
            user.highestScore = score;
        }

        if (user.highestScore > score && user.currentScore < score) {
            user.currentScore = score;
        }

        await user.save();

        res.json({ message: 'Score updated!' });

    } catch (error) {
        res.status(500).json({ message: 'Error occurred while updating score!' });
    }
}

const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({}, { password: 0, email: 0, isAdmin: 0, isVerified: 0, verificationToken: 0 });
        leaderboard.sort((a, b) => b.highestScore - a.highestScore);

        res.status(200).json({ leaderboard, message: "Leaderboard data!" })
    } catch (error) {
        res.status(500).json({ message: 'Leaderboard server error!' });
    }
}

module.exports = { registerUser, loginUser, verifyToken, getUserScore, updateScore, getLeaderboard };