const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const asyncHandler = require('../../utils/async-handler');
const Users = require('../../models/userSchema');

// get all users
const getUsers = asyncHandler(async (request, response) => {
    const getusers = await Users.find({});
    try {
        response.send(getusers);
    } catch (error) {
        response.status(500).send(error);
    }
});

// register user
const registerUser = asyncHandler(async (request, response) => {
    // console.log(request.body);
    // const user = new loginSchema(request.body);
    try {
        const { name, phone, email, password } = request.body;
        // console.log(name, phone, email, password);
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log('Hashed password: ', hashedPassword);
        const user = await Users.create({
            // name, phone, email, password
            name,
            phone,
            email,
            password: hashedPassword,
        });
        // await user.save();
        response.send(user);
    } catch (error) {
        response.status(404).send({
            message: error.message,
        });
    }
});

const loginUser = asyncHandler(async () => {
    // const { email, password } = req.body;
    // if (!email || !password) {
    //     res.status(400);
    //     throw new Error('all fields are mandatory');
    // }
    // const user = await Users.findOne({ email });
    // // compare the password with hashedpassword
    // if (user && (await bcrypt.compare(password, user.password))) {
    //     const accessToken = jwt.sign(
    //         {
    //             user: {
    //                 username: user.username,
    //                 email: user.email,
    //             },
    //         },
    //         process.env.ACCESS_TOKEN_SECRET
    //     );
    //     res.status(200).send('User Logged in Successfully');
    // } else {
    //     res.status(401);
    //     throw new Error('email or password not valid');
    // }
});

module.exports = { getUsers, loginUser, registerUser };
