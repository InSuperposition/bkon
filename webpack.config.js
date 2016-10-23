// For info about this file refer to webpack and webpack-hot-middleware documentation
// Rather than having hard coded webpack.config.js for each environment, this
// file generates a webpack config for the environment passed to the getConfig method.
import path from 'path';
import webpack from 'webpack';
import validate, { Joi } from 'webpack-validator';
import DashboardPlugin from 'webpack-dashboard/plugin';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Visualizer from 'webpack-visualizer-plugin';
// import doiuse from 'doiuse';
import autoprefixer from 'autoprefixer';
import { Environments } from './src/constants/StaticTypes';
import pkg from './package.json';

const cssModulePaths = [
  path.resolve(__dirname, 'src'),
];

const VERBOSE = false;
const getPlugins = (env) => {
  console.log('NODE_ENV', env);
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env === Environments.DEV,
  };

  const plugins = [
    new DashboardPlugin(),
    new CaseSensitivePathsPlugin(),
    new CompressionPlugin({
      // asset: '[path].gz[query]',
      // algorithm: 'gzip',
      // woff and woff2 are compressed formats
      // test: /\.js$|\.html$|\.css$|\.woff$|\.woff2$|\.ttf$|\.eot$/,
      // threshold: 0,
      // minRatio: 0.8,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app',
      mobile: true,
    }),
    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.ProvidePlugin({}),
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].js',
    }),
    new Visualizer(),
  ];

  switch (env) {
    default:
    case Environments.PROD:
      plugins.push(new ExtractTextPlugin('[name].[contenthash].css'));
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin());
      break;
    case Environments.DEV:
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }
  plugins.push();

  return plugins;
};

const getLoaders = (env) => {
  const loaders = [
    {
      test: /\.js(x)?$/,
      exclude: /node_modules/,
      loaders: ['babel', 'eslint'],
    },
    {
      test: /\.json$/,
      loader: 'json',
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loader: 'file?name=images/[name].[ext]',
    },
    // font mimetypes -> http://stackoverflow.com/a/20723357/1402195
    // https://shellmonger.com/2016/01/22/working-with-fonts-with-webpack/
    // http://survivejs.com/webpack/loading-assets/loading-fonts/
    {
      test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?mimetype=application/font-woff&name=fonts/[name].[ext]',
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      // Change these paths, change font-face
      // which is faster TTR(Time To Render), file or url? middleground?
      loader: 'file?mimetype=application/font-sfnt&name=fonts/[name].[ext]',
    },

    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]',
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader:
        'babel?presets[]=stage-2,presets[]=es2015,presets[]=react!' +
        'svg-react!svgo?useConfig=svgo',
    },
  ];

  if (env === Environments.PROD) {
    // generate separate physical stylesheet for production build using ExtractTextPlugin.
    // This provides separate caching and avoids a flash of unstyled content on load.
    loaders.push({
      test: /(\.css|\.scss)$/,
      loader: ExtractTextPlugin.extract('style',
        [
          `css?${JSON.stringify({
            sourceMap: true,
          // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            localIdentName: '[hash:base64:4]',
          // CSS Nano http://cssnano.co/options/
            minimize: true,
          })}`,
          'postcss',
          'resolve-url',
          'sass?sourceMap',
        ]),
      // Opt-In to CSS modules
      include: cssModulePaths,
    });
    loaders.push({
      test: /(\.css|\.scss)$/,
      loader: ExtractTextPlugin.extract('style',
        [
          `css?${JSON.stringify({
            sourceMap: true,
          // CSS Modules https://github.com/css-modules/css-modules
            modules: false,
            localIdentName: '[hash:base64:4]',
          // CSS Nano http://cssnano.co/options/
            minimize: true,
          })}`,
          'postcss',
          'resolve-url',
          'sass?sourceMap',
        ]),
      // Opt-Out to CSS modules
      exclude: cssModulePaths,
    });
  } else {
    // loader for CSS modules
    loaders.push({
      test: /(\.css|\.scss)$/,
      loaders: ['style',
        `css?${JSON.stringify({
          sourceMap: true,
          // CSS Modules https://github.com/css-modules/css-modules
          modules: true,
          localIdentName: '[name]_[local]_[hash:base64:3]',
          // CSS Nano http://cssnano.co/options/
          minimize: false,
        })}`,
        'postcss',
        'resolve-url',
        'sass?sourceMap'],
      // Opt-In to CSS modules
      include: cssModulePaths,
    });
    // loader for CSS modules
    loaders.push({
      test: /(\.css|\.scss)$/,
      loaders: ['style',
        `css?${JSON.stringify({
          sourceMap: true,
          // CSS Modules https://github.com/css-modules/css-modules
          modules: false,
          localIdentName: '[name]_[local]_[hash:base64:3]',
          // CSS Nano http://cssnano.co/options/
          minimize: false,
        })}`,
        'postcss',
        'resolve-url',
        'sass?sourceMap'],
        // Opt-Out to CSS modules
      exclude: cssModulePaths,
    });
  }

  return loaders;
};

const getEntry = (env) => {
  const entry = [
    // load public path dynamically to fix issues with images, fonts, etc.
    './src/webpack-public-path',
  ];

  if (env === Environments.DEV) { // only want hot reloading when in dev.
    entry.push('react-hot-loader/patch');
    entry.push('webpack-hot-middleware/client');
  }

  entry.push('./src/index');
  return entry;
};

const getConfig = (env) => {
  const schemaExtension = Joi.object({
    // this would just allow the property and doesn't perform any additional validation
    sassLoader: Joi.any(),
    svgo: Joi.object(),
  });
  return validate({
    resolve: {
      extensions: ['', '.js', '.jsx', '.css', '.scss'],
    },
    stats: {
      colors: true,
      reasons: VERBOSE,
      hash: VERBOSE,
      version: VERBOSE,
      timings: true,
      chunks: VERBOSE,
      chunkModules: VERBOSE,
      cached: VERBOSE,
      cachedAssets: VERBOSE,
    },
    debug: true,
    // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
    // and https://webpack.github.io/docs/configuration.html#devtool
    devtool: env === Environments.PROD ? 'source-map' : 'eval-source-map',
    // set to false to see a list of every file being bundled.
    // noInfo: false,
    entry: {
      app: getEntry(env),
      vendor: Object.keys(pkg.dependencies),
    },
    // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    target: env === Environments.TEST ? 'node' : 'web',
    output: {
      // NOTE: Physical files are only output by the production build task `npm run build`.
      path: `${__dirname}/deploy/_Publish/app`,
      // publicPath is loaded dynamically getEntry()
      // to fix issues with images, fonts, etc.
      publicPath: '/',
      filename: env === Environments.PROD ? '[name].[chunkhash].js' : 'bundle.js',
    },
    plugins: getPlugins(env),
    module: {
      loaders: getLoaders(env),
    },
    // Loders config
    eslint: {
      formatter: require('eslint-formatter-pretty'),
    },
    postcss: () => [
      autoprefixer,
    ],
    // sassLoader: {
    //   data: '@import "main.scss";',
    //   includePaths: [path.resolve(__dirname, './src/assets/themes')],
    // },
    svgo: {
      // https://github.com/svg/svgo
      plugins: [
      { removeDimensions: true },
      ],
    },
  },{
    schemaExtension,
  });
};

export default getConfig;
