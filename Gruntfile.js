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
				src: ['src/js/*.js']
			},
		},
		// ----------------------------------------------------------------------
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				stripBanners: true
			},
			website_js: {
				src: ['src/js/*.js'],
				dest: 'src/js/gen/script-all.js'
			},
			website_css: {
				src: ['src/css/*.css'],
				dest: 'src/css/gen/style-all.css'
			}
		},
		// ----------------------------------------------------------------------
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			website: {
				src: 'src/js/gen/script-all.js',
				dest: 'js/script.min.js'
			}
		},
		// ----------------------------------------------------------------------
		cssmin: {
			options: {
				banner: '<%= banner %>',
			},
			website: {
				src: ['src/css/gen/style-all.css'],
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
			files:{
				'index.html':'src/index.html'
				}
			}
		}
	});

	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	


	// Default task(s).
	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'htmlmin']);

};