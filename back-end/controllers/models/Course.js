const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema

mongoose.plugin(slug);
// Định nghĩa schema cho User
const Course = new Schema({
  name: {
    type: String,
    required: true,  // Bắt buộc phải có tên
  },
  description: {
    type: String,
    required: true,
    unique: true,  
  },
  videoId: {
    type: String,
    required: true,
    unique: true,  
  },
  count: {
    type: Number,
    min: 0,  // Tuổi phải lớn hơn hoặc bằng 0
  },
  image: {

    type: String,
    maxlength:255,
  },
  country :{
    type: String,
    maxlength: 255 ,
  },
  slug: {
    type: String,
    unique: true,
    slug: 'name',  // Đảm bảo rằng slug vẫn được xác định ở đây
  }
  
  // createdAt: {
  //   type: Date,
  //   default: Date.now,  // Tự động đặt thời gian tạo hiện tại
  // },
  // updateAt: {
  //   type: Date,
  //   default: Date.now,  // Tự động đặt thời gian tạo hiện tại
  // },
  
},{
  timestamps:true,
});


// Xuất model để sử dụng ở các nơi khác
module.exports = mongoose.model('Course', Course)
