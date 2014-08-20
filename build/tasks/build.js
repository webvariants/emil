module.exports = function(grunt) {

  grunt.config.merge({
    watch: {
      files: ['<%= pkg.project.directories.src %>/**/*'],
      tasks: ['build'],
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
      build: ['<%= pkg.project.directories.bin %>/*'],
      removeTemp: ['<%= pkg.project.directories.bin %>/templates']
    },

    less: {
      build: {
        options: {
          ieCompat: true,
          relativeUrls: false,
          paths: ['<%= pkg.project.directories.src %>']
        },
        files: {
          '<%= pkg.project.directories.bin %>emil.css': '<%= pkg.project.directories.src %>/emil.less' 
        }
      }
    },
    svgmin: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= pkg.project.directories.src %>/icons',
          src: ['*.svg'],
          dest: '<%= pkg.project.directories.bin %>/icons'
        }]
      }
    },
    grunticon: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= pkg.project.directories.bin %>/icons',
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
          cwd: '<%= pkg.project.directories.src %>',
          src: ['demo.jade'],
          ext: '.html'
        }]
      }
    },
    copy: {
      build: {
        expand: true,
        cwd: '<%= pkg.project.directories.src %>/font',
        src: [ '**/*' ],
        dest: '<%= pkg.project.directories.bin %>/font/'
      },
      glyphicon: {
        expand: true,
        cwd: '<%= pkg.project.directories.vendor %>/bootstrap/fonts',
        src: [ '**' ],
        dest: '<%= pkg.project.directories.bin %>/font'
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

  grunt.registerTask('build', '', [
      'clean:build',
      'less:build',
      'svgmin:build',
      'grunticon:build',
      'jade:build',
      'copy:build',
      'copy:glyphicon'
  ]);
};
