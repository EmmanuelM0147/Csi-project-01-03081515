/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        default: false,
        vendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /[\\/]node_modules[\\/](@vercel|next|react|react-dom)[\\/]/,
          priority: 40,
          enforce: true,
        },
        lib: {
          test(module) {
            return module.size() > 150000;
          },
          name(module) {
            return `lib-${module.libIdent({context: __dirname})}`;
          },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
        },
        shared: {
          name(module, chunks) {
            return `shared-${chunks[0].name}`;
          },
          priority: 10,
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    };
    
    // Handle Handlebars properly
    config.module.rules.push({
      test: /\.handlebars$/,
      loader: 'handlebars-loader',
    });
    
    // Ignore require.extensions warnings from Handlebars
    config.ignoreWarnings = [
      { module: /node_modules\/handlebars\/lib\/index\.js/ }
    ];
    
    return config;
  },
};

module.exports = nextConfig;