module.exports = function(grunt) {

  grunt.config.merge({
    watch: {
      files: ['<%= pkg.project.directories.src %>/**/.less', '<%= pkg.project.directories.src %>/**/*.jade'],
      tasks: ['build'],
      options: {
        spawn: false,
        interrupt: true,
        livereload: true
      },
      clear: {
        //clear terminal on any watch task. beauty.
        files: ['<%= pkg.project.directories.src %>/*.less', '<%= pkg.project.directories.src %>/*.jade'],
        tasks: ['build']
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

    jade: {
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

  grunt.registerTask('build', '', [
      'clean:build',
      'less:build',
      'jade:build'
  ]);
};
