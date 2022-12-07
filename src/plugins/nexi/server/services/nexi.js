const {
  items,
  sections,
  collections,
  singles,
  categories,
  itemRelations,
} = require("./schema");

module.exports = ({strapi}) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  getSingleTypeStatus() {
    const statuses = {};

    const singleTypes = Object.keys(singles);
    for (const uid of singleTypes) {
      const contentType = strapi.contentTypes[uid];
      statuses[uid] = contentType
        ? {
          added: Boolean(contentType?.pluginOptions?.["content-manager"]?.visible),
          uid,
          displayName: contentType.info.displayName,
          icon: contentType.info.icon,
        }
        : {
          added: false,
          uid,
          displayName: singles[uid].info.displayName,
          icon: singles[uid].info.icon,
        };
    }

    return statuses;
  },

  getCollectionTypeStatus() {
    const statuses = {};

    const collectionTypes = Object.keys(collections);
    for (const uid of collectionTypes) {
      const contentType = strapi.contentTypes[uid];
      statuses[uid] = contentType
        ? {
          added: Boolean(contentType?.pluginOptions?.["content-manager"]?.visible),
          uid,
          displayName: contentType.info.displayName,
          icon: contentType.info.icon,
        }
        : {
          added: false,
          uid,
          displayName: collections[uid].info.displayName,
          icon: collections[uid].info.icon,
        };
    }

    return statuses;
  },

  getItemComponentStatus() {
    const statuses = {};

    const components = Object.keys(items);
    for (const uid of components) {
      const component = strapi.components[uid];
      statuses[uid] = component
        ? {
          added: true,
          uid,
          displayName: component.info.displayName,
          icon: component.info.icon,
        }
        : {
          added: false,
          uid,
          displayName: items[uid].info.displayName,
          icon: items[uid].info.icon,
        };
    }

    return statuses;
  },

  getSectionComponentStatus() {
    const statuses = {};

    const components = Object.keys(sections);
    for (const uid of components) {
      const component = strapi.components[uid];
      statuses[uid] = component
        ? {
          added: true,
          uid,
          displayName: component.info.displayName,
          icon: component.info.icon,
        }
        : {
          added: false,
          uid,
          displayName: sections[uid].info.displayName,
          icon: sections[uid].info.icon,
        };
    }

    return statuses;
  },

  async addContentType(uid) {
    const contentType = strapi.contentTypes[uid];

    if (contentType) {
      await strapi
        .plugin("content-type-builder")
        .services["content-types"]
        .editContentType(contentType.uid, {
          contentType: {
            ...contentType,
            pluginOptions: {
              "content-manager": {visible: true},
              "content-type-builder": {visible: true},
            },
          },
        });
    }
  },

  async removeContentType(uid) {
    const contentType = strapi.contentTypes[uid];

    if (contentType) {
      await strapi
        .plugin("content-type-builder")
        .services["content-types"]
        .editContentType(contentType.uid, {
          contentType: {
            ...contentType,
            pluginOptions: {
              "content-manager": {visible: false},
              "content-type-builder": {visible: false},
            },
          },
        });
    }
  },

  async addComponent(uid) {
    let component = strapi.components[uid];

    if (!component) {
      const category = uid.split(".")[0];
      component = categories[category][uid];
      if (component) {
        // Add related items first
        const entries = Object.entries(itemRelations);
        for (const [iuid, ilist] of entries) {
          if (ilist.map(e => e.uid).includes(uid)) {
            await this.addComponent(iuid);
          }
        }

        await strapi
          .plugin("content-type-builder")
          .services.components.createComponent({
            component: {
              category,
              displayName: component.info.displayName,
              icon: component.info.icon,
              attributes: component.attributes,
            },
          });
      }
    }
  },

  async removeComponent(uid) {
    const component = strapi.components[uid];

    if (component) {
      // check if any related component existing
      if (itemRelations[uid]) {
        for (const e of itemRelations[uid]) {
          if (e.category === "items" || e.category === "sections") {
            if (strapi.components[uid]) {
              throw new Error(`Component ${e.uid} depends on ${uid}`);
            }
          } else if (e.category === "singles" || e.category === "collections") {
            if (strapi.contentTypes) {
              throw new Error(`Content-type ${e.uid} depends on ${uid}`);
            }
          }
        }
      }

      await strapi
        .plugin("content-type-builder")
        .services.components.deleteComponent(uid);
    }
  },

});
