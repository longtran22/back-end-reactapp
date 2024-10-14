// const User =require('../modules/user')
// const login_raw=async (req, res) => {
//     const { email, password } = req.body;
// console.log(email, password)
//     try {
//         // Tìm user theo email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid' });
//         }else{
// if (user.password!==password) {
//             res.status(400).json({ message: 'wrong password' });
//         }else{
//             res.status(200).json({ message: 'Login successful', user });
//         }
//         }
        

//         // Nếu thành công, trả về thông báo thành công
        
//     } catch (error) {
//         console.error('Login error:', error); // Thêm thông tin lỗi vào console
//         res.status(500).json({ message: 'Error logging in', error });
//     }
// }
// const login_google =async (req, res) => {
//     const { GoogleID,family_name,given_name } = req.body;
//     let name=family_name+" "+given_name;
//     console.log(name,GoogleID);
//     try{
//         const user = await User.findOne({ GoogleID });
//         if (!user) {
//             const newUser = new User({ GoogleID,name });
//         await newUser.save();  // Lưu người dùng mới vào cơ sở dữ liệu

//         res.status(201).json({
//             message: 'User created successfully',
//             user: newUser
//         });
//         }else{
//         res.status(200).json({ message: 'Login successful', user });            
//         }

//     }catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Error logging in', error });
//     }

// }
// const sign_up = async (req, res) => {
//     const { name, email, password  } = req.body;
// console.log(name, email,password);
//     try {
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'email đã tồn tại' });}
//         const newUser = new User({ name, email, password  });
//         await newUser.save();  // Lưu người dùng mới vào cơ sở dữ liệu

//         res.status(201).json({
//             message: 'User created successfully',
//             user: newUser
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user', error});
//     }
// }
// module.exports = {
//     login_raw,
//     login_google,
//     sign_up
// }

const bcrypt = require('bcrypt'); // Thêm bcrypt vào đầu file
const User = require('../modules/user');


const login_raw = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm user theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Kiểm tra nếu mật khẩu của user chưa được mã hóa
        const isPasswordHashed = user.password.startsWith('$2b$');
        if (!isPasswordHashed) {
            // Nếu mật khẩu chưa được mã hóa, tiến hành mã hóa và cập nhật vào DB
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await user.save(); // Cập nhật mật khẩu đã mã hóa vào cơ sở dữ liệu
        }

        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
}

// const login_raw = async (req, res) => {
//     const { email, password } = req.body;
//     console.log(email, password);

//     try {
//         // Tìm user theo email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email' });
//         }

//         // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Wrong password' });
//         }

//         res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//         console.error('Login error:', error); // Thêm thông tin lỗi vào console
//         res.status(500).json({ message: 'Error logging in', error });
//     }
// };

const login_google = async (req, res) => {
    const { GoogleID, family_name, given_name } = req.body;
    const name = `${family_name} ${given_name}`;
    console.log(name, GoogleID);

    try {
        const user = await User.findOne({ GoogleID });
        if (!user) {
            const newUser = new User({ GoogleID, name });
            await newUser.save(); // Lưu người dùng mới vào cơ sở dữ liệu

            res.status(201).json({
                message: 'User created successfully',
                user: newUser
            });
        } else {
            res.status(200).json({ message: 'Login successful', user });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const sign_up = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Mã hóa mật khẩu trước khi lưu
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save(); // Lưu người dùng mới vào cơ sở dữ liệu

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

module.exports = {
    login_raw,
    login_google,
    sign_up
};
