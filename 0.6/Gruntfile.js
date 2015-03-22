/*jshint camelcase:false */
/*
 * Mantri • ember.js • TodoMVC
 * https://github.com/thanpolas/todoAppMantri
 *
 * Copyright (c) 2013 Thanasis Polychronakis,
 *     Tom Dale, Стас Сушков
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    //
    // Grunt configuration:
    //
    //
    grunt.initConfig({
        watch: {
            docs: {
                files: ['*.html','src/**/*','css/**/*','js/**/*'],
                options: {
                    livereload: true
                },
                tasks: ['clean', 'copy:dist']
                
            }
            
        },
        connect: {
            docs: {
                options: {
                    port: 4242,
                    base: './dist'
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {expand: true, src: ['0.3/**'], dest: 'dist/'},
                    {expand: true, src: ['build/**'], dest: 'dist/'},
                    {expand: true, src: ['css/**'], dest: 'dist/'},
                    {expand: true, src: ['img/**'], dest: 'dist/'},
                    {expand: true, src: ['js/**'], dest: 'dist/'},
                    {expand: true, src: ['src/**'], dest: 'dist/'},
                    {expand: true, src: ['*.html'], dest: 'dist/'}

                ]
            }
        },
        clean: {
            dist: ["dist/"]
        },
        pkg: grunt.file.readJSON('package.json')
    });


    // Create shortcuts to main operations.
    //grunt.registerTask('server', ['docs', 'connect:gremlinjs', 'watch:docs']);

    // the default task, when 'grunt' is executed with no options.
    grunt.registerTask('default', ['clean:dist', 'copy:dist', 'connect:docs', 'watch:docs']);

};

