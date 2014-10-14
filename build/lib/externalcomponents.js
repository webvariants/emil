module.exports = function(grunt) {

  //@TODO refactor and create as plugin
  
    //@TODO refactor and create as plugin
    var remote = function (cmd, cwd, done) {
        var spawn = require('superspawn').spawn;
        var remote = spawn('grunt', [cmd], {cwd: cwd}, function (err, data) {
            if (err) {
                console.error(err);
                done();
            }
            grunt.log.ok(cmd+' '+cwd+' finished ('+data+')');
            done();
        });

        // remote.stdout.on('data', function (data) {
        //     grunt.log.write(data);
        // });
        // remote.stderr.on('data', function (data) {
        //     grunt.fail.fatal(data);
        // });
        // remote.on('close', function (code) {
        //     grunt.log.ok(cmd+' '+cwd+' finished ('+code+')');
        //     done();
        // });
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
