module.exports = ({strapi}) => ({
  singleTypeStatus(ctx) {
    ctx.body = strapi
      .plugin("nexi")
      .service("nexi")
      .getSingleTypeStatus();
  },

  collectionTypeStatus(ctx) {
    ctx.body = strapi
      .plugin("nexi")
      .service("nexi")
      .getCollectionTypeStatus();
  },

  itemComponentStatus(ctx) {
    ctx.body = strapi
      .plugin("nexi")
      .service("nexi")
      .getItemComponentStatus();
  },

  sectionComponentStatus(ctx) {
    ctx.body = strapi
      .plugin("nexi")
      .service("nexi")
      .getSectionComponentStatus();
  },

  // async init(ctx) {
  //   strapi.reload.isWatching = false;

  //   try {
  //     const data = await strapi
  //       .plugin("nexi")
  //       .service("nexi")
  //       .createCollections();
  //       // .createComponents();

  //     if (data) setImmediate(() => strapi.reload());

  //     ctx.body = data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  async addContentType(ctx) {
    strapi.reload.isWatching = false;

    try {
      const {uid} = ctx.request.body;

      await strapi
        .plugin("nexi")
        .service("nexi")
        .addContentType(uid);

      setImmediate(() => strapi.reload());

      // eslint-disable-next-line require-atomic-updates
      ctx.body = {success: true};
    } catch (error) {
      console.log(error);
    }
  },

  async removeContentType(ctx) {
    strapi.reload.isWatching = false;

    try {
      const {uid} = ctx.request.body;

      await strapi
        .plugin("nexi")
        .service("nexi")
        .removeContentType(uid);

      setImmediate(() => strapi.reload());

      // eslint-disable-next-line require-atomic-updates
      ctx.body = {success: true};
    } catch (error) {
      console.log(error);
    }
  },

  async addComponent(ctx) {
    strapi.reload.isWatching = false;

    try {
      const {uid} = ctx.request.body;

      await strapi
        .plugin("nexi")
        .service("nexi")
        .addComponent(uid);

      setImmediate(() => strapi.reload());

      // eslint-disable-next-line require-atomic-updates
      ctx.body = {success: true};
    } catch (error) {
      console.log(error);
    }
  },

  async removeComponent(ctx) {
    strapi.reload.isWatching = false;

    try {
      const {uid} = ctx.request.body;

      await strapi
        .plugin("nexi")
        .service("nexi")
        .removeComponent(uid);

      setImmediate(() => strapi.reload());

      // eslint-disable-next-line require-atomic-updates
      ctx.body = {success: true};
    } catch (error) {
      console.log(error);
    }
  },
});
