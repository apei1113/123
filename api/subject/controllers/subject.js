'use strict';
const fetch = require("node-fetch");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    apiSubjectsPage: async (ctx) => {
        try {
            //0610 1:08:36 不知道為什麼不能用 
            //const response = await strapi.service.assignmnets.find();
            const response = await fetch("http://localhost:1337/subjects");// 外部寫法
            const data = await response.json();
            
            console.log("apiSubjectsPage", data);
            return await ctx.render("apiSubjects/index", { data });
            //res req是網頁寫法，ctx是strapi的
            // res.render('apiSubjects/index', { data });
            } catch (err) {
                console.log("Errors on getting subjects!");
                return await ctx.render("apiSubjects/index", { data: "" });
            }
    },
    apiSubjectsAddPage: async (ctx) => {
        return await ctx.render('apiSubjects/add', {
            Name: '',
            Code: '',
            professor: '',
            teaching_assistant: '',
            Department_of_Courses: '',
            credits: '',
        });
    },
    apiSubjectsAdd: async (ctx) => {
        const Name = ctx.request.body.Name;
        const Code = ctx.request.body.Code;
        const professor = ctx.request.body.professor;
        const teaching_assistant = ctx.request.body.teaching_assistant;
        const Department_of_Courses = ctx.request.body.Department_of_Courses;
        const credits = ctx.request.body.credits;

         // console.log(name, author);
        console.log(Name, Code, professor, teaching_assistant, Department_of_Courses, credits);

        const form_data = {
            Name: Name,
            Code: Code,
            professor: professor,
            teaching_assistant: teaching_assistant,
            Department_of_Courses: Department_of_Courses,
            credits: credits,
          };
  
        try {
            const response = await fetch('http://localhost:1337/subjects', {
                method: 'post',
                body:    JSON.stringify(form_data),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            // res.redirect('/apiSubjects');
            return await ctx.redirect('/apiSubjects');
        } catch(err) {
            console.log(err);
            // res.render('apiSubjects/add', {
            return await ctx.render('apiSubjects/add', {
                Name: form_data.Name,
                Code: form_data.Code,
                professor: form_data.professor,
                teaching_assistant: form_data.teaching_assistant,
                Department_of_Courses: form_data.Department_of_Courses,
                credits: form_data.credits,
            });
        }
    },
    apiSubjectsEditPage: async (ctx) => {
        const id = ctx.params.id;
        try {
            const response = await fetch(`http://localhost:1337/subjects/${id}`);
            const data = await response.json();
      
            // res.render('apiSubjects/edit', {
            return await ctx.render('apiSubjects/edit', {
                id: data.id,
                Name: data.Name,
                Code: data.Code,
                professor: data.professor,
                teaching_assistant: data.teaching_assistant,
                Department_of_Courses: data.Department_of_Courses,
                credits: data.credits
            });
        } catch(err) {
            console.log(err);
        }
    },
    apiSubjectsUpdate: async (ctx) => {
        const Name = ctx.request.body.Name;
        const Code = ctx.request.body.Code;
        const professor = ctx.request.body.professor;
        const teaching_assistant = ctx.request.body.teaching_assistant;
        const Department_of_Courses = ctx.request.body.Department_of_Courses;
        const credits = ctx.request.body.credits;
        const id = ctx.request.body.id;

        const form_data = {
            Name: Name,
            Code: Code,
            professor: professor,
            teaching_assistant: teaching_assistant,
            Department_of_Courses: Department_of_Courses,
            credits: credits,
        };

        try {
            const response = await fetch(`http://localhost:1337/subjects/${id}`, {
            method: 'put',
            body:    JSON.stringify(form_data),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        return await ctx.redirect('/apiSubjects');
        } catch(err){
        console.log(err);
        }
    },
    apiSubjectsDelete: async (ctx) => {
        // router.get('/delete/:ClassName', async function (req, res, next) {
        let id = ctx.params.id;
        try {
            // const response = await fetch(`http://localhost:1337/subjects/${id}`, {
            const response = await fetch(`http://localhost:1337/subjects/${id}`, {
            method: 'delete'
        });

        const data = await response.json();

        // res.redirect('/apiSubjects');
        return await ctx.redirect('/apiSubjects');

        } catch (err) {
            console.log(err);
        }
        // res.redirect('/subjects');
        return await ctx.redirect('/subjects');
    }
};
