module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({
        hmb: {
            compile: {
                options: {
                    src: './site/',
                    dist: '../dist',
                    pack: true, //是否按照将js,css的uri打包
                    env: {
                        'NODE_ENV': 'dev'
                    },
                    command: 'm,D,l,p' //m: md5, D: domains, l: lint, o: optimize, p: pack
                }
            },
            deploy: {
                options: {
                    src: './site/',
                    dist: '../dist',
                    pack: true, //是否按照将js,css的uri打包
                    env: {
                        'NODE_ENV': 'production'
                    },
                    command: 'm,D,l,o,p' //m: md5, D: domains, l: lint, o: optimize, p: pack
                }
            }
        },

        //添加模块的相关配置
        hma: {
            options: {
                src: './site/'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            modules: {
                src: ['modules/**/*.js']
            }
        },

        qiniu: {
            sync: {
                options: {
                    ACCESS_KEY: 'x',
                    SECRET_KEY: 'x',
                    bucket: 'x',
                    prefix: 'static/',
                    path: __dirname
                },
                files: {
                    'logs/qiniu.json': ['dist/static/']
                }
            }
        },

        watch: {
            scripts: {
                options: {
                    livereload: true
                },
                files: ['site/**/*'],
                tasks: ['hmb:compile']
            },
            src: {
                files: ['modules/**/*.*'],
                tasks: ['jshint:modules']
            }
        }
    });

    grunt.loadNpmTasks('grunt-hmb');
    grunt.loadNpmTasks('grunt-qiniu');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('deploy', ['hmb:deploy', 'qiniu']);

    grunt.registerTask('default', ['jshint']);
};