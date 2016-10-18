/* eslint-disable no-console */
// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
import webpack from 'webpack';
import chalk from 'chalk';
import { argv as args } from 'yargs';
import webpackConfigBuilder from '../webpack.config';

// this assures React is built in prod mode and that the Babel dev config doesn't apply.
process.env.NODE_ENV = 'production';

const webpackConfig = webpackConfigBuilder(process.env.NODE_ENV);

webpack(webpackConfig).run((err, stats) => {
  const inSilentMode = args.s; // set to true when -s is passed on the command

  if (!inSilentMode) {
    console.log(chalk.blue.bold('Generating minified bundle for production use via Webpack...'));
  }

  if (err) { // so a fatal error occurred. Stop here.
    console.log(chalk.red.bold(err));

    return -1;
  }

  const jsonStats = stats.toJson();

  if (stats.hasErrors()) {
    jsonStats.errors.map(error => console.log(chalk.red(error)));
    return -1;
  }

  if (stats.hasWarnings() && !inSilentMode) {
    console.log(chalk.yellow.bold('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  if (!inSilentMode) {
    console.log(`Webpack stats: ${stats}`);
  }

  // if we got this far, the build succeeded.
  console.log(chalk.green.bold(`Your app has been compiled in production mode and written to /dist.
  It's ready to roll!
  To view production build run the following command:
  `));
  console.log(chalk.green('npm'), chalk.white('run open:dist'));
  return 0;
});
