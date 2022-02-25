const smacss = require("css-property-sort-order-smacss");

const order = Object.entries(smacss).map(([groupName, section]) => {
  const properties = [];

  for (const item of section)
    if (Array.isArray(item)) properties.push(...item);
    else properties.push(item);

  return { groupName, properties };
});

module.exports = {
  plugins: ["stylelint-order"],
  rules: {
    "order/properties-order": order
  }
};
