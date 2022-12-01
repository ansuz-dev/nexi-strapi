module.exports = [
  {
    method: "GET",
    path: "/status",
    handler: "nexi.status",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/init",
    handler: "nexi.init",
    config: {
      policies: [],
      auth: false,
    },
  },
];
