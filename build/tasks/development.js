module.exports = function(grunt) {

  grunt.config.merge({
    clean: {
      development: [
        '<%= pkg.project.directories.bin %>/*',
        '!<%= pkg.project.directories.bin %>vendor.js',
      ]
    },

    // @NOTE not supported yet
    sudo_subcomponents: {
      development: {
        options: {
          cmd: 'grunt',
          args: ['development'],
        }
      }
    },

    watch: {
      development: {
        files: [
          '<%= pkg.project.directories.src %>*',
        ],
        tasks: [],
        options: {
          spawn: true,
          interrupt: true,
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('development', [
    'clean:development',
    'uglify:client',
    'sudo_components:build',
    'less:client',
    'jade:client',
  ]);

  // alias
  grunt.registerTask('dev', ['development']);

  grunt.registerTask('default', 'starts the development process and watch for changes.', [
    'development',
    'watch:development'
  ]);
};
