const cron = require('node-cron')
const User = require('../src/Users/user.model')

const removeOTP = () => {
    cron.schedule("*/1 * * * *", async () => {
        try {
            const currTime = Date.now()
            await User.updateMany(
                { otptime: { $lt: currTime } },
                { $set: { otp: '', otptime: '' } }
            )
            // console.log('expires otp removed')

        } catch (error) {
            console.error("Error removing expired OTPs:", error);
        }
    })
}

module.exports = { removeOTP }


