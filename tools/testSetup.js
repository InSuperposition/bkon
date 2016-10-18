// this file called by the `npm run test`
// check package.json for test options and file paths
import 'ignore-styles';
// Tests are placed alongside files under test.
// This file does the following:
// 1. Sets the environment to 'production' so that
//    dev-specific babel config in .babelrc doesn't run.
process.env.NODE_ENV = 'production';

