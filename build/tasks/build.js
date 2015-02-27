module.exports = function(grunt) {

  grunt.config.merge({
    clean: {
      all: ['<%= pkg.project.directories.bin %>/*']
    },
    copy: {
      src: {
        expand: true,
        cwd: '<%= pkg.project.directories.src %>',
        src: [ '**' ],
        dest: '<%= pkg.project.directories.bin %>'
      },
      glyphicon: {
        expand: true,
        cwd: '<%= pkg.project.directories.vendor %>/bootstrap/fonts',
        src: [ '**' ],
        dest: '<%= pkg.project.directories.bin %>/font'
      },
      bootstrap: {
        expand: true,
        cwd: '<%= pkg.project.directories.vendor %>',
        src: ['**/*'],
        dest: '<%= pkg.project.directories.bin %>/vendor'
      }
    },
    concat: {
      jade: {
        files: [{
          flatten: true,
          src: ['<%= pkg.project.directories.bin %>/src/**/*.jade'],
          dest: '<%= pkg.project.directories.bin %>/emil.jade'
        }]
      }
    },

    sudo_subcomponents: {
      development: {
        options: {
          cmd: 'grunt',
          args: ['build'],
        }
      }
    }
  });

  grunt.registerTask('build', '', [
      'clean:all',
      'copy:src',
      'concat:jade',
      'copy:bootstrap'
  ]);
  grunt.registerTask('development',['build']);
};
