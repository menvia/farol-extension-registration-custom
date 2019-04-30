module.exports = extension => {
  const controller = {};

  const request = require("request-promise");
  const baseURL = extension.settings.url;

  controller.send = async registration =>
    request({
      url: baseURL,
      method: "PUT",
      body: JSON.stringify({
        customerName: `${registration.user.first_name} ${
          registration.user.last_name
        }`,
        customerEmail: registration.user.email,
        customerPhone: registration.user.telephone,
        customerBirth:
          typeof registration.user.details.birthday === "string"
            ? registration.user.details.birthday.split("T")[0]
            : undefined,
        companyName: registration.user.details.company,
        companyJob: registration.user.details.role,
        preRegistration: registration._id
      })
    });

  controller.sendFile = async (customerId, file) =>
    request({
      method: "POST",
      url: `${baseURL}Photo?customerId=${customerId}`,
      body: file
    });
  return controller;
};
