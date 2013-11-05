/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: ';\n'
      },
      dist: {
        src: ['dist/*.min.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      LinkedList: {
        src: 'src/LinkedList.js',
        dest: 'dist/LinkedList.min.js'
      },
      PagedData: {
        src: 'src/PagedData.js',
        dest: 'dist/PagedData.min.js'
      }
    },
    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/*.js']
      },
      test: {
        src: ['test/*.js']
      }
    },
    qunit: {
      files: ['test/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'uglify', 'concat']);

};
