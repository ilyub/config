module.exports = {
  rules: {
    "vue/html-self-closing": [
      "warn",
      {
        html: {
          component: "always",
          normal: "never",
          void: "always"
        },
        math: "always",
        svg: "always"
      }
    ]
  }
};
