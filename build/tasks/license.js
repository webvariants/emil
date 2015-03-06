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
          comment: {
            start: '//-',
            end: ''
          },
          indent: 4
        },
        files: [{src: ['src/**/*.jade']}]
      }
    }
  });

  grunt.registerTask('license', '', [
      'licensr:jade',
  ]);
};
