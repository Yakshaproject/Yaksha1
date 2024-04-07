import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,} = req.body
        
        let user = await User.findOne({
            email: req.body.email,
        }); 


        if (user) { 
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user = new User({
            firstname,
            lastname,
            email,
            password: passwordHash,
        })
        await user.save();

        const token = jwt.sign({
            userId: user.id,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            }
        );

        res.cookie("auth token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 864000000
        })

        res.status(200).send({message : "User registered successfully"});
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Request body: ", email, password)
        const user = await User.findOne({ email: email });
        console.log("User: ", user)
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Password" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        })

        res.cookie("auth token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 864000000
        })
        res.status(200).json({userId: user._id})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const logout = async (req, res) => {
    res.cookie("auth token", "", {
        expires : new Date(0)
    })
    res.send();
}