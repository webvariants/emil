
module.exports = function(grunt) {
  // constants and settings
  grunt.option('branch', 'default');

  grunt.option('commandline-options', {
    stdout: true,
    stderr: true,
    failOnError: true
  });

  // auto-loading
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*'],
    config: 'package.json',
    scope: ['devDependencies', 'dependencies']
  });
  require('time-grunt')(grunt);
// grunt-newer
// grunt-watch
// grunt-notify

  // grunt.option('commandline-options', {
  //   stdout: true,
  //   stderr: true,
  //   failOnError: true
  // });

  // config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });
  
  grunt.loadTasks(grunt.config('pkg.project.directories.build-lib'));
  grunt.loadTasks(grunt.config('pkg.project.directories.build-tasks'));
};
