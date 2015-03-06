module.exports = function(grunt) {

  grunt.config.merge({
    licensr: {
      jade: {
        options: {
          license: 'LICENSE'
        },
        files: [{src: ['src/**/*.less']}]
      }
    }
  });

  grunt.registerTask('license', '', [
      'licensr:jade',
  ]);
};
