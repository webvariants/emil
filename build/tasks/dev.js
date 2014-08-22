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
      glyphicon: {
        expand: true,
        cwd: '<%= pkg.project.directories.vendor %>/bootstrap/fonts',
        src: [ '**' ],
        dest: '<%= pkg.project.directories.bin %>/font'
      },
      fonts: {
        expand: true,
        cwd: '<%= pkg.project.directories.src %>/font',
        src: [ '**/*' ],
        dest: '<%= pkg.project.directories.bin %>/font'
      },
      jade: {
        flatten: true,
        expand: true,
        cwd: '<%= pkg.project.directories.src %>/components',
        src: ['**/*.jade'],
        dest:' <%= pkg.project.directories.bin %>/mixins'
      }
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
    svgmin: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= pkg.project.directories.bin %>/src/icons',
          src: ['*.svg'],
          dest: '<%= pkg.project.directories.bin %>/src/icons'
        }]
      }
    },
    grunticon: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= pkg.project.directories.bin %>src/icons',
          src: ['*.svg'],
          dest: '<%= pkg.project.directories.bin %>/grunticon'
        }]
      }
    },
    jade: {
      options: {
        pretty: true
      },
      build: {
        options: {
          client: false,
          compileDebug: false,
          debug: false
        },
        files: [{
          expand: true,
          dest: '<%= pkg.project.directories.bin %>',
          cwd: '<%= pkg.project.directories.bin %>/mixins',
          src: ['**/*.jade'],
          ext: '.html'
        }]
      }
    },
    
    concat: {
      build: {
        src: '<%= pkg.project.directories.bin %>/templates/components/*.html',
        dest: '<%= pkg.project.directories.bin %>/mixins.html'
      }
    }
  });
  //@TODO refactor and create as plugin
  var gruntRemote = function (cmd, cwd, done) {
    var spawn  = require('child_process').spawn,
        remote = spawn('grunt', [cmd], {cwd: cwd});

    remote.stdout.on('data', function (data) {
      grunt.log.write(data);
    });
    remote.stderr.on('data', function (data) {
      grunt.fail.fatal(data);
    });
    remote.on('close', function (code) {
      grunt.log.ok(cmd+' '+cwd+' finished ('+code+')');
      done();
    });
  };

  grunt.registerTask('dev', '', [
      'clean:all',
      'copy:vendor',
      'copy:src',
      'copy:fonts',
      'less:build',
      'svgmin:dev',
      'grunticon:build',
      'jade:build',
      'copy:glyphicon',
      'clean:src'
  ]);
  grunt.registerTask('default', ['dev', 'watch']);
};
