/* eslint-disable no-console */
import ncp from 'ncp';

const filter = (path) => path.indexOf('node_modules') === -1;

ncp('./deploy', './dist', { filter }, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log('done!');
});
