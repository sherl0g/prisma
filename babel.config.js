module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: ['babel-plugin-istanbul', {
    // specify some options for NYC instrumentation here
    // like tell it to instrument both JavaScript and Vue files
    extension: ['.js', '.vue'],
  }],
};
