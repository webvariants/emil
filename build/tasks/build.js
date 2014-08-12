module.exports = function(grunt) {

  grunt.config.merge({
    watch: {
      files: [
        '<%= pkg.project.directories.src %>',
      ],
      tasks: ['build'],
      options: {
        spawn: false,
      },
    },

    clean: {
      build: ['<%= pkg.project.directories.bin %>/*']
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
      'less:build'
  ]);
};
