// eslint-disable-next-line no-unused-vars

const addressItem = require("../components/items/address-item.json");
const contactItem = require("../components/items/contact-item.json");
const linkItem = require("../components/items/link-item.json");
const pricingItem = require("../components/items/pricing-item.json");
const quoteItem = require("../components/items/quote-item.json");
const serviceItem = require("../components/items/service-item.json");
const slideItem = require("../components/items/slide-item.json");
const socialItem = require("../components/items/social-item.json");
const statItem = require("../components/items/stat-item.json");

const items = {
  "items.address-item": addressItem,
  "items.contact-item": contactItem,
  "items.link-item": linkItem,
  "items.pricing-item": pricingItem,
  "items.quote-item": quoteItem,
  "items.service-item": serviceItem,
  "items.slide-item": slideItem,
  "items.social-item": socialItem,
  "items.stat-item": statItem,
};

module.exports = ({strapi}) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  getComponent(componentName) {
    const component = strapi.components[componentName];
    console.log("component:", component);

    return component
      ? {
        uid: component.uid,
        modelType: component.modelType,
        category: component.category,
        modelName: component.modelName,
        globalId: component.globalId,
        collectionName: component.collectionName,
        attributes: component.attributes,
      }
      : null;
  },

  async createComponents() {
    try {
      const res = [];

      const itemEntries = Object.entries(items);
      for (const [componentName, componentContent] of itemEntries) {
        const component = this.getComponent(componentName);

        const data = component
          ? await strapi
            .plugin("content-type-builder")
            .services.components.editComponent(component.uid, {
              component: {
                category: "items",
                displayName: componentContent.info.displayName,
                icon: componentContent.info.icon,
                attributes: componentContent.attributes,
              },
            })
          : await strapi
            .plugin("content-type-builder")
            .services.components.createComponent({
              component: {
                category: "items",
                displayName: componentContent.info.displayName,
                icon: componentContent.info.icon,
                attributes: componentContent.attributes,
              },
            });

        res.push(data.uid);
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  },
});
