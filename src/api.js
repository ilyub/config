module.exports = {
  eslint: {
    boundaries: {
      elementTypes: {
        createRules: (generator, ...args) => {
          const result = [];

          for (const [allowIndex, allowFilename] of args.entries())
            for (const [fromIndex, fromFilename] of args.entries())
              if (allowIndex < fromIndex)
                result.push({
                  allow: [generator(allowFilename)],
                  from: [generator(fromFilename)]
                });

          return result;
        }
      }
    }
  }
};
