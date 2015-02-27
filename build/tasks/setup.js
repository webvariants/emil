module.exports = function(grunt) {

  var mapping = {
    darwin: {
      cmd: 'sh',
      args: ['setup.sh']
    },
    linux: {
      cmd: 'sh',
      args: ['setup.sh']
    },
    windows: {
      cmd: 'cmd',
      args: ['setup.bat']
    }
  };

  var platform = require('os').platform();

  grunt.config.merge({
    sudo_subcomponents: {
      setup: {
        options: mapping[platform]
      }
    }
  });

  grunt.registerTask('setup', 'Triggers the setup script', [
      'sudo_subcomponents:setup',
  ]);
};
