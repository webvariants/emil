module.exports = function(grunt) {

  grunt.config.merge({
    watch: {
      files: ['<%= pkg.project.directories.src %>/**/*'],
      tasks: ['dev'],
      options: {
        spawn: false,
        interrupt: true,
        livereload: true
      },
      clear: {
        //clear terminal on any watch task. beauty.
        files: ['<%= pkg.project.directories.src %>/**/*'],
        tasks: ['clear']
      }
    },
    clean: {
      all: ['<%= pkg.project.directories.bin %>/*'],
      src: ['<%= pkg.project.directories.bin %>/src/*']
    },
    copy: {
      vendor: {
        expand: true,
        cwd: '<%= pkg.project.directories.vendor %>',
        src: ['**/*'],
        dest: '<%= pkg.project.directories.bin %>/src/vendor'
      },
      src: {
        expand: true,
        cwd: '<%= pkg.project.directories.src %>',
        src: [ '**/*' ],
        dest: '<%= pkg.project.directories.bin %>/src'
      },
      jade: {
        flatten: true,
        expand: true,
        cwd: '<%= pkg.project.directories.src %>/components',
        src: ['**/*.jade'],
        dest:'<%= pkg.project.directories.bin %>/mixins'
      }
    },
    concat: {
      options: {
        stripBanners: true
      },
      jade: {
        cwd: '<%= pkg.project.directories.bin %>/mixins',
        src: ['**/*.jade'],
        dest: '<%= pkg.project.directories.bin %>/mixins/emil.jade',
      },
    },
    less: {
      build: {
        options: {
          ieCompat: true,
          relativeUrls: false,
          paths: ['<%= pkg.project.directories.bin %>/src']
        },
        files: {
          '<%= pkg.project.directories.bin %>emil.css': '<%= pkg.project.directories.src %>/emil.less'
        }
      }
    },
    jade: {
      options: {
        pretty: true
      },
      dev: {
        options: {
          client: false,
          compileDebug: false,
          debug: false
        },
        files: [{
          expand: true,
          dest: '<%= pkg.project.directories.bin %>',
          cwd: '<%= pkg.project.directories.bin %>/src',
          src: ['*.jade', '!emil.jade'],
          ext: '.html'
        }]
      }
    },
    concat: {
      jade: {
        files: [{
          flatten: true,
          src: ['<%= pkg.project.directories.bin %>/src/components/**/*.jade'],
          dest: '<%= pkg.project.directories.bin %>/src/emil.jade'
        }]
      }
    },

    // @NOTE not supported yet (from the specific subcomponents)
    sudo_subcomponents: {
      development: {
        options: {
          cmd: 'grunt',
          args: ['development'],
        }
      }
    }
  });

  grunt.registerTask('development', '',[
      'clean:all',
      'copy:vendor',
      'copy:src',
      'less:build',
      'concat:jade',
      'jade:dev'
  ]);
  // alias
  grunt.registerTask('dev', ['development']);
  grunt.registerTask('default', 'starts the development process and watch for changes.', ['dev','watch']);
};
