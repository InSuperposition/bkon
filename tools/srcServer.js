import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import webpackConfigBuilder from '../webpack.config';
import { Environments } from '../src/constants/StaticTypes';

const webpackConfig = webpackConfigBuilder(Environments.DEV);
const bundler = webpack(webpackConfig);

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  server: {
    baseDir: 'src',
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: webpackConfig.output.publicPath,
        // https://webpack.github.io/docs/node.js-api.html#stats (docs not complete)
        // https://github.com/webpack/webpack/blob/master/lib/Stats.js#L21
        stats: {
          // output is more concise when chunks/modules are set to false
          chunks: false,
          chunkModules: false,
          modules: false,
          warnings: true,
          colors: true,
          hash: true,
          version: true,
          timings: true,
          assets: true,
          // children: true,
          cached: true,
          reasons: true,
          source: true,
          errorDetails: true,
          chunkOrigins: true,
          assetsSort: 'name',
        },
        // Set to false to display a list of each file that is being bundled.
        noInfo: false,
        quiet: false,
        hot: true,
        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),
      // bundler should be the same as above
      webpackHotMiddleware(bundler),
    ],
  },
  logConnections: true,
  browser: process.platform === 'linux' ? 'google-chrome' : 'google chrome',

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html',
  ],
});
