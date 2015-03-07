module.exports = function(grunt) {

  grunt.config.merge({
    licensr: {
      less: {
        options: {
          license: 'LICENSE'
        },
        files: [{src: ['src/**/*.less']}]
      },
      jade: {
        options: {
          license: 'LICENSE',
          topdoc: true
        },
        files: [{src: ['src/**/*.jade']}]
      }
    }
  });

  grunt.registerTask('license', '', [
      'licensr:jade',
      'licensr:less',
  ]);
};
