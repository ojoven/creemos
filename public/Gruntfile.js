// Sample project configuration.
module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            dist: {
                src: [
                    'js/src/vendor/jquery.min.js',
                    'js/src/vendor/moment.min.js',
                    'js/src/app/**/*.js',
                ],
                dest: 'js/app.min.js'
            }
        },
        uglify: {
            my_target : {
                options : {
                    sourceMap : false,
                    sourceMapName : 'sourceMap.map'
                },
                // We'll be using a common JS for all the sites
                files : {
                    'js/app.min.js' : [
                        'js/app.min.js'
                    ]
                }
            }
        },
        compass: {
            dev: {
                dist: {
                    options: {
                        sassDir: 'css/scss',
                        cssDir: 'css',
                        outputStyle: 'nested'
                    }
                }
            },
            prod: {
                dist: {
                    options: {
                        sassDir: 'css/scss',
                        cssDir: 'css',
                        outputStyle: 'nested'
                    }
                }
            }
        },
        watch: {
            watch_js_files: {
                files : ['js/src/**/*.js'],
                tasks : ['concat']
            },
            watch_css_files: {
                files : ['css/scss/**/*.scss'],
                tasks : ['compass:dev']
            },
            watch_html_files: {
                files : ['src/**/*.html', 'src/*.html'],
                tasks : ['includereplace']
            }
        },
        includereplace: {
            dev: {
                options: {
                    srcDir: 'src/'
                },
                files: [
                    {src: '*.html', dest: 'views/', expand: true, cwd: 'src/'},
                ]
                //src: '*.html',
                //dest: 'views'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-include-replace');

    // Default, to be used on development environments
    grunt.registerTask('default', ['includereplace', 'compass:dev', 'concat', 'watch']); // First we compile and concat JS and then we watch

    // Post Commit, to be executed after commit
    grunt.registerTask('deploy', ['concat', 'uglify', 'compass:prod']);

};