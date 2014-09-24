module.exports = function(grunt) {

  grunt.config.merge({
    externalcomponents: {
      setup: {
        options: {
          cmd: 'sh',
          args: ['setup.sh']
        }
      }
    }
  });

  grunt.registerTask('setup', '', ['externalcomponents:setup']);
};
