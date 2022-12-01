module.exports = ({strapi}) => ({
  status(ctx) {
    ctx.body = strapi
      .plugin("nexi")
      .service("nexi")
      .getWelcomeMessage();
  },

  async init(ctx) {
    strapi.reload.isWatching = false;

    try {
      const data = await strapi
        .plugin("nexi")
        .service("nexi")
        .createComponents();

      if (data) setImmediate(() => strapi.reload());

      ctx.body = data;
    } catch (error) {
      console.log(error);
    }
  },
});
