/**
 * Include dependencies
 */
// console.log('Include dependencies');
var path	= require('path');

/**
 * Define App variables
 */
// console.log('Define App variables');
var paths	= {
	app:	path.join(__dirname, '/app/'),
	models:	path.join(__dirname, '/app/models/'),
	logs:	path.join(__dirname, '/logs/'),
	bin:	path.join(__dirname, '/bin/'),
	video:	path.join(__dirname, '/assets/video/'),
};
// console.log('paths', paths);
// set up logger

/**
 * Load models
 */
// console.log('Load models');
var Projector		= require(path.join(paths.models, 'Projector'));

/**
 * Initialize and run the App
 **/
Projector.init({
	binDir:		paths.bin,
	videosDir:	paths.video
});