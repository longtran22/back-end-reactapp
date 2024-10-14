const { multipleMongooseToObject } = require('../util/mogoose'); // Sửa chính tả từ 'mogoose' thành 'mongoose'
const Course = require('./models/Course');

// class MeController {
    
//     // [GET] /me/stored/courses
//     storedCourses(req, res, next) {
//         Course.find({})
//             .then(courses => {
//                 res.render('me/stored-courses', {
//                     courses: multipleMongooseToObject(courses)
//                 });
//             })
//             .catch(next);
//     }
    
//     // [GET] /search/:slug
//     searchCourses(req, res, next) {
//         const { slug } = req.params;
//         Course.find({ slug: slug }) // Hoặc điều kiện tìm kiếm khác nếu cần
//             .then(courses => {
//                 res.render('me/search-results', {
//                     courses: multipleMongooseToObject(courses)
//                 });
//             })
//             .catch(next);
//     }
// }

// module.exports = new MeController();


class MeController {
    //[GET]/me/stored/courses
    async storedCourses(req, res, next) {
        try {
            const courses = await Course.find({}); // Sử dụng await để chờ kết quả
            res.render('me/stored-courses', {
                courses: multipleMongooseToObject(courses),
            });
        } catch (err) {
            next(err); // Bắt lỗi và gọi middleware xử lý lỗi
        }
    }
}

module.exports = new MeController();
