module.exports = function(grunt) {

  grunt.config.merge({
     watch: {
      test: {
        files: [
          '<%= pkg.project.directories.test %>/step_definitions/**/*',
        ],
        tasks: [''],
        options: {
          spawn: true,
          interrupt: true,
        }
      }
    },
    sudo_subcomponents: {
      test: {
        options: {
          cmd: 'grunt',
          args: ['test']
        }
      }
    }
  });

  grunt.registerTask('test', '', [
    'sudo_subcomponents:test',
  ]);
};
