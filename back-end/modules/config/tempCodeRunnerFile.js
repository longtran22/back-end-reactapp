const mongoose = require('mongoose');

const connectOtherDB = async () => {
  try {
    const otherDB = mongoose.createConnection('mongodb://localhost:27017/other_database', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Kết nối đến other_database thành công');
    return otherDB; // Trả về kết nối để sử dụng
  } catch (error) {
    console.error('Lỗi kết nối đến other_database:', error.message);
    process.exit(1);
  }
};

module.exports = connectOtherDB; // Xuất hàm kết nối
