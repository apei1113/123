'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */


module.exports = {
    overview: async (ctx) => {
        let data = {};
        try {
            const entities = await strapi.services.category.find();
            data.hats = entities[0].products;
            data.jackets = entities[1].products;
            data.sneakers = entities[2].products;
            data.womens = entities[3].products;
            data.mens = entities[4].products;
            console.log("data.mens", JSON.stringify(data.mens));
            return await ctx.render("products2_27_overview", {
                data,
                title: "Shop Overview",
                count: 4,
            });
        } catch(err){
            console.log(err);
        }
    },
    shopPage: async (ctx) => {
        const data = await strapi.services.product.find();
        console.log("data",data);
        return await ctx.render("products2_27", {
            data,
            title: "Shop Products"
        });
    },
    categoryPage: async (ctx) => {
        const category = ctx.params.category;
        console.log("category", category);
        const cat = await strapi.services.category.findOne({ name: category });
        console.log("cat", category, cat.cid);
        const data = await strapi.connections.default.raw(
            `SELECT * FROM products where category = ${cat.cid}`
        );
        console.log("data", JSON.stringify(data));
        return await ctx.render("products2_27", {
            data,
            title: ctx.params.category
        });
    }
};
