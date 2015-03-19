'use strict';

module.exports = function(grunt) {

  grunt.config.merge({
    compress: {
      "package": {
        options: {
          mode: 'zip',
          archive: '<%= pkg.project.directories.package %><%= pkg.name %>_<%= config.repository.revision.long %>.zip',
        },
        files: [{
          src: ['<%= pkg.project.directories.bin %>/**'],
          dest: '<%= pkg.project.directories.package %>'
        }]
      }
    }
  });

  grunt.registerTask('package', '', [
    'build',
    'compress:package'
  ]);
};
