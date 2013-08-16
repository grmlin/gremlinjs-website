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

    grunt.loadNpmTasks('mantri');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

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
                }
                
            }
            
        },
        connect: {
            docs: {
                options: {
                    port: 4242,
                    base: './'
                }
            }
        },
        pkg: grunt.file.readJSON('package.json')
    });


    // Create shortcuts to main operations.
    //grunt.registerTask('server', ['docs', 'connect:gremlinjs', 'watch:docs']);

    // the default task, when 'grunt' is executed with no options.
    grunt.registerTask('default', ['connect:docs', 'watch:docs']);

};

