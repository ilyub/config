const smacss = require("css-property-sort-order-smacss");

const order = Object.entries(smacss).map(([groupName, items]) => {
  const properties = [];

  for (const item of items)
    if (Array.isArray(item)) properties.push(...item);
    else properties.push(item);

  return { groupName, properties };
});

module.exports = {
  plugins: ["stylelint-order"],
  rules: { "order/properties-order": order }
};
