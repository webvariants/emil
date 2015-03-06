'use strict';

module.exports = function(grunt) {

  grunt.config.merge({
    config: {
      repository: {
        type: undefined,
        revision: {
          "short": undefined,
          "long": undefined
        },
        tag: undefined,
        branch: undefined,
      }
    }
  });

  grunt.registerTask('repository_git', function () {
    var terminate = this.async();
    var git = require('git-rev');
    var j = 4;
    var done = function () {
      j--;
      if (j === 0) {
        terminate();
      }
    };

    grunt.config('config.repository.type', 'git');

    git.short(function (str) {
      grunt.config('config.repository.revision.short', str);
      done();
    });

    git.long(function (str) {
      grunt.config('config.repository.revision.long', str);
      done();
    });

    git.branch(function (str) {
      grunt.config('config.repository.branch', str);
      done();
    });

    git.tag(function (str) {
      grunt.config('config.repository.tag', str);
      done();
    });
  });

  grunt.task.run(['repository_git']);
};
