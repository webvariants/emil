module.exports = function(grunt) {

  //@TODO use rsync from npm module
  //@FIXME for user specific properties, use variables and set it in a template / config file
  grunt.config.merge({
    shell: {
      deployvm: {
        command: 'rsync -avz <%= pkg.project.directories.bin %>* root@machine:/dir'
      }
    }
  });

  grunt.registerTask('deploy', ['shell:deployvm']);
};
