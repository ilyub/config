module.exports = {
  eslint: {
    boundaries: {
      elementTypes: {
        createRules: (type, ...args) => {
          const captures = {};

          for (const [index, arg] of args.slice(0, -1).entries())
            captures[`part${index + 1}`] = arg;

          const groups = args.at(-1);

          const name = `part${args.length}`;

          const result = [];

          for (const [index1, group1] of groups.entries())
            for (const [index2, group2] of groups.entries())
              if (index1 > index2)
                result.push({
                  allow: [[type, { ...captures, [name]: group2 }]],
                  from: [[type, { ...captures, [name]: group1 }]]
                });

          return result;
        }
      }
    }
  }
};
