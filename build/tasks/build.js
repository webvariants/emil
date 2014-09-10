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
      'clean:all',
      'copy:src',
      'concat:jade',
      'copy:bootstrap'
  ]);
};
