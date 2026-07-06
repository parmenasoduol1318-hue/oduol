module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@": ".",
            "@components": "./components",
            "@services": "./services",
            "@store": "./store",
            "@utils": "./utils",
            "@types": "./types"
          }
        }
      ]
    ]
  };
};