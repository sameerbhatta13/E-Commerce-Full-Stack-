const asyncHandler = require('../../utils/asyncHandler')
const User = require('./user.model')
const { sendEmail, sendEmailFB } = require('../../utils/verifyEmail')
const otpGenerator = require('../../utils/otpGenerator')
const ApiResponse = require('../../utils/apiResponse')
const ApiError = require('../../utils/apiError')
const jwtToken = require('../../utils/jwtTokenGenerator')
const jwt = require('jsonwebtoken')
const { encryptPassword, decryptPassword } = require('../../utils/encryptPassword')


exports.postUser = asyncHandler(async (req, res) => {
    let { username, email, phone, role, password } = req.body
    const image = req.file ? req.file.filename : null //optional field

    let newOTP = otpGenerator()

    const { iv, encryptedData } = encryptPassword(password)

    let user = new User({
        username,
        email,
        phone,
        role,
        password: encryptedData,
        otp: newOTP,
        image: image,
        iv: iv
    })
    const existingUser = await User.findOne({ email: user.email })
    // console.log('data', data)
    if (existingUser == null) {
        user = await user.save()
        await sendEmail({
            from: process.env.USER_EMAIL,
            to: user.email,
            subject: "hi how are you",
            html: `<h1>your OTP is ${newOTP}</h1>`
        })
        res.status(201).json(new ApiResponse("successfully sign up and please verify your otp", user))
    }
    else {
        throw new ApiError('Email already exits.')

    }

})


//verify user

exports.verify = asyncHandler(async (req, res) => {
    let { otp } = req.body


    if (!otp) {
        throw new ApiError('opt is required.', 400)

    }
    const user = await User.findOne({ otp })
    if (!user) {
        throw new ApiError('opt does not match', 400)
    }
    const currTime = Date.now()
    if (user.otptime < currTime) {
        const updateUser = await User.findByIdAndUpdate(user._id, {
            otp: '',
            otptime: undefined
        })
        await updateUser.save()
        throw new ApiError("otp is expired", 400)
    }
    // user.isvarified=true
    // user.otp=null
    // user.otptime=null
    // await user.save()

    await User.findByIdAndUpdate(user._id, {
        isvarified: true,
        otp: '',
        otptime: undefined

    })
    res.status(200).json(new ApiResponse("account is verified")
    )
})


exports.signIn = asyncHandler(async (req, res) => {
    let { email, password } = req.body
    let user = await User.findOne({ email })
    if (!user) throw new ApiError("user is not registered", 403)

    const descriptedPassword = decryptPassword(user.password, user.iv)

    if (!user.isvarified) throw new ApiError("your account is not verified, otp is send to your email please verify")
    if (descriptedPassword != password) {
        throw new ApiError("email or password  does not match", 403)
    }
    const accessToken = jwtToken.jwtToken(user._id, user.role)
    const refreshToken = jwtToken.refToken(user._id)
    const role = user.role

    user.refrestoken = refreshToken
    await user.save()


    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true
        })
        .json({ accessToken, role, refreshToken, msg: "loged in successfully" })

}
)

exports.RefreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) throw new ApiError('no token found')
    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFTOKEN)
        const user = await User.findById(decodedToken?.userId)
        console.log(user)
        if (!user) { throw new ApiError('not a valid token') }

        const newAccessToken = jwtToken.jwtToken(user._id)
        const newRefreshToken = jwtToken.refToken(user._id)

        return res
            .cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: ''
            })
            .cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: true
            }).status(200)
            .json({ newAccessToken, refToken: newRefreshToken })
    } catch (error) {

        throw new ApiError('Invalid or expired refresh token', 403);
    }
})


exports.forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    const checkEmail = await User.findOne({ email: email })
    if (!checkEmail) {
        throw new ApiError('email does not find', 400)
    }
    const otp = otpGenerator()
    await sendEmailFB({
        to: checkEmail.email,
        subject: `Reset Password OTP`,
        html: `do not share your otp , use this otp to resent password </br> <b>${otp}</b>`
    })
    await User.findOneAndUpdate({ email }, {
        otp: otp
    }, { new: true })
    res.json(new ApiResponse('otp is sent to reset passsword to your gmail', { userId: checkEmail._id }))

})

exports.verifyOtp = asyncHandler(async (req, res) => {
    const { otp } = req.body
    if (!otp) {
        throw new ApiError('provide a otp')
    }
    const user = await User.findOne({ otp: otp })
    if (!user) {
        throw new ApiError('otp does not match')
    }

    await User.findOneAndUpdate({ otp }, {
        otp: ''
    })
    res.json(new ApiResponse('otp is verified '))
})

exports.resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body
    const { iv, encryptedData } = encryptPassword(password)
    const update = await User.findByIdAndUpdate(req.params.id, { password: encryptedData, iv: iv },
        { new: true })

    if (!update) {
        throw new ApiError("user not found")
    }
    else {
        return res
            .status(200)
            .json(new ApiResponse(" updated successfully", update));
    }
})


exports.myData = asyncHandler(async (req, res) => {
    const { _id } = req.user

    const data = await User.findById(_id).select('-password')

    return res.status(200).json(new ApiResponse('my data', data))

})

exports.updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user

    if (req.file) {
        const file = req.file.filename
        const updateUser = await User.findByIdAndUpdate({ _id: _id }, { ...req.body, image: file }, { new: true })

        if (!updateUser) {
            throw new ApiError('user is not found ', 400)
        }
        return res.json(new ApiResponse('user updated successfully', updateUser))

    }
    else {
        const updateUser = await User.findByIdAndUpdate({ _id: _id }, { ...req.body }, { new: true })
        if (!updateUser) {
            throw new ApiError('user is not found ', 400)
        }
        return res.json(new ApiResponse('user updated successfully', updateUser))
    }

})

exports.getAllUser = asyncHandler(async (req, res) => {
    const data = await User.find({})
    res.status(200).json(new ApiResponse('here is all user', data))
})


exports.adminLogIn = asyncHandler(async (req, res) => {
    let { email, password } = req.body

    let user = await User.findOne({ email })
    if (!user) throw new ApiError("user is not registered", 403)
    if (!user.isvarified) throw new ApiError("your account is not verified, otp is send to your email please verify")
    if (user.password != password) {
        throw new ApiError("email or password  does not match")
    }
    if (user.role != 'admin') throw new ApiError('you are not admin', 403)

    const token = jwtToken(user._id)
    res.status(200).json({ token, msg: "loged in successfully" })


})

//logout route

exports.logoutUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    console.log(_id)
    await User.findByIdAndDelete(_id, {
        $unset: {
            refrestoken
        }
    }, {
        new: true
    })

    return res
        .status(200)
        .json('user logged out ')
})




