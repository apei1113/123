'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    homepage: async (ctx) => {
        let entities;
        entities = await strapi.services.category.find();
        // console.log("entities", entities);
        return await ctx.render("crown2_27", {
          data: entities,
          title: "408410727",
        });
    },
};
