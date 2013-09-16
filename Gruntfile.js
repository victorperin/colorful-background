module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// ----------------------------------------------------------------------
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			src: {
				options: {
					jshintrc: 'src/.jshintrc'
				},
				src: ['src/**/*.js']
			},
			website: {
				src: ['website-src/js/*.js']
			},
		},
		// ----------------------------------------------------------------------
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				stripBanners: true
			},
			src: {
				src: ['src/**/*.js'],
				dest: '<%= pkg.name %>.js'
			},
			website_js: {
				src: ['website-src/js/*.js'],
				dest: 'website-src/js/gen/script-all.js'
			},
			website_css: {
				src: ['website-src/css/*.css'],
				dest: 'website-src/css/gen/style-all.css'
			}
		},
		// ----------------------------------------------------------------------
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			src: {
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
			},
			website: {
				src: 'website-src/js/gen/script-all.js',
				dest: 'website/js/script.min.js'
			}
		},
		// ----------------------------------------------------------------------
		cssmin: {
			options: {
				banner: '<%= banner %>',
			},
			website: {
				src: ['website-src/css/gen/style-all.css'],
				dest: 'website/css/style.min.css'
			}
		},
		// ----------------------------------------------------------------------
		htmlmin: {
			website: {
				options: {                                 
				removeComments: true,
				collapseWhitespace: true
			},
			files:{
				'website/index.html':'website-src/index.html'
				}
			}
		},
		// ----------------------------------------------------------------------
		copy: {
			website: {
				src: '<%= pkg.name %>.min.js',
				dest: 'website/<%= pkg.name %>.min.js',
			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	


	// Default task(s).
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'htmlmin', 'copy']);

};