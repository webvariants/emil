module.exports = function(grunt) {

  //@TODO refactor and create as plugin
  var remote = function (cmd, args, cwd, done) {
    var spawn  = require('child_process').spawn,
        remote = spawn(cmd, args, {cwd: cwd});

    remote.stdout.on('data', function (data) {
      grunt.log.write(""+data);
    });
    remote.stderr.on('data', function (data) {
      console.error(""+data);
    });
    remote.on('close', function (code) {
      if (code !== 0) {
        grunt.fail.fatal(code);
      }
      grunt.log.ok(cmd+' '+args.join(', ')+' '+cwd+' finished ('+code+')');
      done();
    });
  };

  grunt.registerMultiTask('externalcomponents', '', function () {
    var terminate = this.async();
    var cmd  = this.options().cmd;
    var args = this.options().args;
    var j = 1;
    var done = function () {
      j--;
      if (j === 0) {
        terminate();
      }
    };
    var components = grunt.config('pkg.project.components');
    for (var c in components) {
      j++;
      remote(cmd, args, components[c], done);
    }
    done();
  });

};
