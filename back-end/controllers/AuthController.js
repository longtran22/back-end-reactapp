const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = require('../modules/user'); // Model User

const AuthController = {
    // Gửi mã xác nhận qua email
    async forgotPassword(req, res) {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Email không tồn tại!' });
            }
    
            // Tạo mã xác nhận ngẫu nhiên
            const resetCode = crypto.randomBytes(3).toString('hex'); // 6 ký tự
            user.resetCode = resetCode;
            user.resetCodeExpire = Date.now() + 10 * 60 * 1000; // Mã code có hiệu lực trong 10 phút
            await user.save();
    
            // Cấu hình gửi mail
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Hoặc SMTP server khác
                auth: {
                    user: 'baolong081104@gmail.com',
                    pass: 'sugi azhu mxpz snjy',
                },
            });
    
            const mailOptions = {
                from: 'baolong081104@gmail.com',
                to: user.email,
                subject: 'Mã xác nhận đặt lại mật khẩu',
                text: `Mã xác nhận của bạn là: ${resetCode}`,
            };
    
            // Gửi email
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Mã xác nhận đã được gửi đến email của bạn!' });
        } catch (error) {
            console.error('Error in forgotPassword:', error); // In thông tin lỗi ra console
            res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại lỗi forgotpassword!' });
        }
    },
    
    // Xác minh mã code và tạo mật khẩu mới
    async resetPassword(req, res) {
        const { email, code, newPassword } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Email không tồn tại!' });
            }

            // Kiểm tra mã xác nhận và thời gian hết hạn
            if (user.resetCode !== code || user.resetCodeExpire < Date.now()) {
                return res.status(400).json({ message: 'Mã xác nhận không hợp lệ hoặc đã hết hạn!' });
            }

            // Mã hợp lệ -> hash và lưu mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetCode = undefined;
            user.resetCodeExpire = undefined;
            console.log('Mật khẩu đã được mã hóa:', hashedPassword);

            await user.save();

            res.status(200).json({ message: 'Đặt lại mật khẩu thành công!' });
        } catch (error) {
            res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại này khi resetpasword!' });
        }
    },
};

module.exports = AuthController;
