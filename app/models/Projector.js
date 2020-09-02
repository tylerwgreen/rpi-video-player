var execFile	= require('child_process').execFile;
var fs			= require('fs');

var Projector = {
	params: {
		binDir:		null,
		videosDir:	null,
	},
	init: function(params){
		console.log('Projector.init', params);
		this.params = Object.assign(this.params, params);
		this.files.init(Projector.projectRandom); // callback will automatically start projecting after initialization
		// this.testRandomization();
	},
	testRandomization: function(){
		console.log('Projector.testRandomization');
		this.files.init(function(){
			console.log('Projector.testRandomization init callback');
			var its	= 25;
			for(var i = 0; i <= its; i++){
				console.log('Random video at index: ' + i, Projector.files.random());
			}
		});
	},
	projectRandom: function(){
		console.log('Projector.project');
		var file = Projector.files.random();
		console.log('Projector.project | Projecting random file: ' + file);
		console.log('Projector.project | executing file: ' + Projector.params.binDir + 'projector-project');
		child		= execFile(
			Projector.params.binDir + 'projector-project',
			[file],
			function(error, stdout, stderr){
				if(error){
					console.log('Projector.project | Projector.project.error.stderr: ' + stderr);
					throw new Error(error);
				}else{
					console.log('Projector.project | Projector.project.success.stdout: ' + stdout);
					Projector.projectRandom();
				}
			}
		);
	},
	files: {
		file:	null,
		files:	{
			all:		[], // all video files
			available:	[], // video files available for randomization
		},
		init:	function(callback){
			console.log('Projector.files.init', Projector.params.videosDir);
			// search for existing files in dir
			fs.readdir(Projector.params.videosDir, (err, files) => {
				console.log('Projector.files.init | Read files: ', files);
				if(err){
					throw new Error('Projector.files.init | ' + err);
				}else if(files.length <= 0){
					throw new Error('Projector.files.init | No video files in dir');
				}else{
					console.log('Projector.files.init | generate list of files from dir: ', files);
					var its = 1;
					console.log('Projector.files.init | files.length: ' + files.length);
					files.forEach(function(file, err){
						console.log('Projector.files.init | its: ' + its);
						Projector.files.files.all.push(file);
						if(its >= files.length){
							console.log('Projector.files.init | files initialized, calling callback', Projector.files.files.all);
							callback();
						}else{
							its++;
						}
					});
				}
			});
		},
		random: function(){
			console.log('Projector.files.random');
// console.log('Projector.files.random', Projector.files.randI);
// if(Projector.files.randI >= 10)
	// throw new Error('Too many its');
// Projector.files.randI++;
// console.log('Projector.files.random | files.all: ', Projector.files.files.all);
// console.log('Projector.files.random | files.available: ', Projector.files.files.available);
			if(Projector.files.files.available.length <= 0){
				console.log('Projector.files.random | all files.available files have been played, copy files.all into files.available');
				Projector.files.files.available = Projector.files.files.all.slice(0);
			}
			var file		= Projector.files.files.available[Math.floor(Math.random() * Projector.files.files.available.length)];
			if(typeof file === 'undefined')
				throw new Error('Projector.files.random | No files available in files.all, app was not properly initialized');
			if(
					file === Projector.files.file
				&&	Projector.files.files.available.length > 1
			){
				// console.log('Projector.files.random | files.available.length: ' + Projector.files.files.available.length);
				console.log('Projector.files.random | file ' + file + ' was the previously played file, find another random file');
				return Projector.files.random();
			}
			console.log('Projector.files.random | removing file ' + file + ' from files.available arr');
			var fileIndex	= Projector.files.files.available.indexOf(file);
			Projector.files.files.available.splice(fileIndex, 1);
			Projector.files.file	= file;
			return Projector.params.videosDir + file;
		}
	}
};
module.exports = Projector;