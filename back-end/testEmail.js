const nodemailer = require('nodemailer');

async function sendTestEmail() {
    // Cấu hình transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Sử dụng Gmail
        auth: {
            user: 'baolong081104@gmail.com', // Thay đổi thành email của bạn
            pass: 'long2004', // Sử dụng mật khẩu ứng dụng nếu bạn bật xác thực hai yếu tố
        },
    });

    // Cấu hình thông tin email
    const mailOptions = {
        from: 'baolong081104@gmail.com',
        to: 'baolong081104@gmail.com', // Bạn có thể gửi đến chính bạn để kiểm tra
        subject: 'Test Email',
        text: 'This is a test email to verify Nodemailer connection.',
    };

    try {
        // Gửi email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Gọi hàm để gửi email
sendTestEmail();
