module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// ----------------------------------------------------------------------
		jshint: {
			gruntfile: {
				src: 'Gruntfile.js'
			},
			website: {
				options: {
					"globals": {
						"jQuery": true,
					},

					"evil": true
				},
				src: ['src/website/js/*.js']
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: ['src/*.js']
			}
		},
		// ----------------------------------------------------------------------
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				stripBanners: true
			},
			src: {
				src: ['src/*.js'],
				dest: '<%= pkg.name %>.js'
			},
			website_js: {
				src: ['src/website/js/*.js'],
				dest: 'tmp/gen/script-all.js'
			},
			website_css: {
				src: ['src/website/css/*.css'],
				dest: 'tmp/gen/style-all.css'
			}
		},
		// ----------------------------------------------------------------------
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			src: {
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js',
			},
			website: {
				src: 'tmp/gen/script-all.js',
				dest: 'js/script.min.js'
			}
		},
		// ----------------------------------------------------------------------
		cssmin: {
			options: {
				banner: '<%= banner %>',
			},
			website: {
				src: ['tmp/gen/style-all.css'],
				dest: 'css/style.min.css'
			}
		},
		// ----------------------------------------------------------------------
		htmlmin: {
			website: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'index.html': 'src/website/index.html'
				}
			}
		},
		// ----------------------------------------------------------------------
		copy: {
			main: {
				src: '<%= pkg.name %>.min.js',
				dest: 'js/<%= pkg.name %>.min.js'
			}
		},
		// ----------------------------------------------------------------------
		watch: {
			files: ['src/**/*', '!Gruntfile.js'],
			tasks: ['default'],
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'htmlmin', 'copy']);

};