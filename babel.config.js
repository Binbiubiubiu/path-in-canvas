module.exports = {
  presets:
    process.env.NODE_ENV === "test"
      ? [
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-typescript"
        ]
      : [
        // ["@babel/preset-env",{loose:true}]
      ]
};
