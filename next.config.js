module.exports = {
  webpack: (config, {
    webpack
  }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        })
    );
    // Important: return the modified config
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['s3.us-east-2.amazonaws.com']
  },
  experimental: {
    jsconfigPaths: true,
    granularChunks: true,
  },
};