'use strict';
const fetch = require("node-fetch");
/*Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
  to customize this controller*/
module.exports = {
    apiAssignmentsPage: async (ctx) => {
        try {
            //0610 1:08:36 不知道為什麼不能用 
            //const response = await strapi.service.assignmnets.find();
            const response = await fetch("http://localhost:1337/assignments");// 外部寫法
            const data = await response.json();
            
            console.log("apiAssignmentsPage", data);
            return await ctx.render("apiAssignments/index", { data });
            //res req是網頁寫法，ctx是strapi的
            // res.render('apiAssignments/index', { data });
            } catch (err) {
                console.log("Errors on getting assignments!");
                return await ctx.render("apiAssignments/index", { data: "" });
            }
    },
    apiAssignmentsAddPage: async (ctx) => {
        return await ctx.render('apiAssignments/add', {
            ClassName: '',
            HW_Name: '',
            HW_Grade: '',
        });
    },
    apiAssignmentsAdd: async (ctx) => {
        const ClassName = ctx.request.body.ClassName;
        const HW_Name = ctx.request.body.HW_Name;
        const HW_Grade = ctx.request.body.HW_Grade;

         // console.log(name, author);
        console.log(ClassName, HW_Name, HW_Grade);

        const form_data = {
            ClassName: ClassName,
            HW_Name: HW_Name,
            HW_Grade: HW_Grade,
        };
  
        try {
            // await db.query('INSERT INTO `0521`.books_copy SET ?', form_data);
            const response = await fetch('http://localhost:1337/assignments', {
                method: 'post',
                body:    JSON.stringify(form_data),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            // res.redirect('/apiAssignments');
            return await ctx.redirect('/apiAssignments');
        } catch(err) {
            console.log(err);
            // res.render('apiAssignments/add', {
            return await ctx.render('apiAssignments/add', {
            ClassName: form_data.ClassName,
            HW_Name: form_data.HW_Name,
            HW_Grade: form_data.HW_Grade
            });
        }
    },
    apiAssignmentsEditPage: async (ctx) => {
        const id = ctx.params.id;
        try {
            const response = await fetch(`http://localhost:1337/assignments/${id}`);
            const data = await response.json();
      
            // res.render('apiAssignments/edit', {
            return await ctx.render('apiAssignments/edit', {
                id: data.id,
                ClassName: data.ClassName,
                HW_Name: data.HW_Name,
                HW_Grade: data.HW_Grade
            });
        } catch(err) {
            console.log(err);
        }
    },
    apiAssignmentsUpdate: async (ctx) => {
        const ClassName = ctx.request.body.ClassName;
        const HW_Name = ctx.request.body.HW_Name;
        const HW_Grade = ctx.request.body.HW_Grade;
        const id = ctx.request.body.id;

        const form_data = {
            ClassName: ClassName,
            HW_Name: HW_Name,
            HW_Grade: HW_Grade,
        };

        try {
            const response = await fetch(`http://localhost:1337/assignments/${id}`, {
            method: 'put',
            body:    JSON.stringify(form_data),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        return await ctx.redirect('/apiAssignments');
        } catch(err){
        console.log(err);
        }
    },
    apiAssignmentsDelete: async (ctx) => {
        // router.get('/delete/:ClassName', async function (req, res, next) {
        let id = ctx.params.id;
        // let ClassName = req.params.ClassName;
        try {
            // const response = await fetch(`http://localhost:1337/assignments/${id}`, {
            const response = await fetch(`http://localhost:1337/assignments/${id}`, {
            method: 'delete'
        });

        const data = await response.json();

        // res.redirect('/apiAssignments');
        return await ctx.redirect('/apiAssignments');

        } catch (err) {
            console.log(err);
        }
        // res.redirect('/assignments');
        return await ctx.redirect('/assignments');
    }
};
