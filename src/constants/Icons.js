// FIXME: This needs work

// Using Webpack to import all .svg files in '../assets/svgs'
// https://webpack.github.io/docs/context.html#context-module-api

// requires and returns all modules that match
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext)
    .reduce(
      (acc, component) => Object.assign({}, acc, { [component.displayName]: component }),
      {}
    );

export default requireAll(require.context('../assets/svgs', true, /^\.\/.*\.svg$/));
