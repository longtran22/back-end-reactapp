const { mongooseToObject } = require('../util/mogoose');
const Course = require('./models/Course');

class CourseController {
    
    //[GET]/courses/create
    async create(req, res, next) {  
        res.render('courses/create');
    }

    //[POST]/courses/store
    // async store(req, res, next) { 
    //     const formData = req.body;
    //     formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    //     const course = new Course(formData);
    //     try {
    //         await course.save();  
    //         res.redirect('/');  
    //     } catch (error) {
    //         next(error); // Gọi next để chuyển lỗi đến middleware xử lý lỗi
    //     }
    // }
    async store(req, res, next) { 
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        
        const course = new Course(formData);
        try {
            await course.save();  
            res.redirect('/');  
        } catch (error) {
            next(error); // Chuyển lỗi đến middleware xử lý lỗi
        }
    }
    
    //[GET]/courses/:id/edit
    async edit(req, res, next) {
        try {
            const course = await Course.findById(req.params.id);
            res.render('courses/edit', {
                course: mongooseToObject(course)
            });
        } catch (error) {
            next(error);
        }
    }

    //[PUT]/courses/:id
    async update(req, res, next) {
        try {
            await Course.updateOne({_id: req.params.id}, req.body);
            res.redirect('/me/stored/courses');
        } catch (error) {
            next(error);
        }
    }

    //[DELETE]/courses/:id
    async delete(req, res, next) {
        try {
            await Course.deleteOne({_id: req.params.id});
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }

    //[GET]/courses/:slug
    async show(req, res, next) {
        try {
            const course = await Course.findOne({slug: req.params.slug});
            res.render('courses/show', {
                course: mongooseToObject(course)
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CourseController();
