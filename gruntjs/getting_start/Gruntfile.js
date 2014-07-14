'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    browserify: {
      dist: {
        // 需要合并的文件
        src: ['src/**/*.js'],
        // 合并后的文件
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        // 在混淆的文件头部添加注释
        banner: '<%= banner %>',
        // 生成 SourceMap 文件
        sourceMapRoot: 'dist/',
        sourceMap: '<%= pkg.name %>.min.js.map',
        sourceMapUrl: '<%= pkg.name %>.min.js.map'
      },
      dist: {
        // 需要混淆的文件
        src: '<%= browserify.dist.dest %>',
        // 混淆后的文件输出的位置
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      // 重新配置 jshint 
      options: {
        jshintrc: '.jshintrc'
      },
      // 需要检测的文件
      files: [
        'Gruntfile.js', 'src/**/*.js', 'test/**/*.js'
      ]
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'src/styles/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/styles/',
        ext: '.min.css'
      },
      combine: {
        files: {
          '<%= cssmin.minify.dest %>page1_base.min.css': [
            '<%= cssmin.minify.dest %>base.min.css',
            '<%= cssmin.minify.dest %>page1.min.css'
          ]
        }
      }
    },
    watch: {
      // gruntfile: {
      //   files: '<%= jshint.gruntfile.src %>',
      //   tasks: ['jshint:gruntfile']
      // }
      css:{
        files: ['<%= cssmin.minify.cwd %>'],
        tasks: ['cssmin']
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: [
          'jshint',
          'qunit',
          'browserify'
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['browserify', 'jshint', /*'qunit',*/ 'uglify', 'cssmin']);

};
