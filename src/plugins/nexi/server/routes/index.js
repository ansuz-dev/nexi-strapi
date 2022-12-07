module.exports = [
  {
    method: "GET",
    path: "/status/single-type",
    handler: "nexi.singleTypeStatus",
    config: {policies: []},
  },
  {
    method: "GET",
    path: "/status/collection-type",
    handler: "nexi.collectionTypeStatus",
    config: {policies: []},
  },
  {
    method: "GET",
    path: "/status/item-component",
    handler: "nexi.itemComponentStatus",
    config: {policies: []},
  },
  {
    method: "GET",
    path: "/status/section-component",
    handler: "nexi.sectionComponentStatus",
    config: {policies: []},
  },
  // {
  //   method: "GET",
  //   path: "/init",
  //   handler: "nexi.init",
  //   config: {
  //     policies: [],
  //     auth: false,
  //   },
  // },
  {
    method: "POST",
    path: "/add/content-type",
    handler: "nexi.addContentType",
    config: {policies: []},
  },
  {
    method: "POST",
    path: "/remove/content-type",
    handler: "nexi.removeContentType",
    config: {policies: []},
  },
  {
    method: "POST",
    path: "/add/component",
    handler: "nexi.addComponent",
    config: {policies: []},
  },
  {
    method: "POST",
    path: "/remove/component",
    handler: "nexi.removeComponent",
    config: {policies: []},
  },
];
