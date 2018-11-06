const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf')

function createClone(arr, from_path, to_path) {
	from_path = from_path || 'src'
	let files = rimraf.sync(to_path)
	arr.forEach(item => {
		createCloneDir(item, from_path, to_path)
	})
}

function createCloneDir(settings, from_path, to_path) {
	let allDirs = getAllDirs([from_path]);
	console.log(allDirs);
	let newDirs = createNewDirs(allDirs, to_path);

	createNewFiles(allDirs, to_path)

	function getAllDirs(pathArr) {
		let arr = []
		pathArr.forEach(path => {
			let files = fs.readdirSync(path);
			arr = arr.concat(files.map((name) => {
				if (fs.statSync(path + '/' + name).isDirectory()) {
					return path + '/' + name
				}
			}).filter(item => !!item))
		})
		if (arr.length > 0) {
			return pathArr.concat(arr, getAllDirs(arr))
		} else {
			return pathArr
		}
	}


	function createNewDirs(dirs, to_path) {
		dirs = Array.from(new Set(dirs));
		let newNames = []
		dirs.forEach(item => {
			for (var p in settings.replacedWords) {
				item = item.replace(new RegExp(p, 'g'), settings.replacedWords[p])
			}
			newNames.push(item)
			mkDirToPath(to_path)

			to_path = to_path[to_path.length - 1] === '/' ? to_path : to_path + '/'
			let nameDir = to_path + item;
			if (!fs.existsSync(nameDir)) {
				fs.mkdirSync(nameDir)
			}
		})
		return newNames
	}


	function createNewFiles(dirs, to_path) {
		let arrFiles = [];
		dirs.forEach(path => {
			let files = fs.readdirSync(path);
			arrFiles = arrFiles.concat(files.map((name) => {
				if (fs.statSync(path + '/' + name).isFile()) {
					return path + '/' + name
				}
			}).filter(item => !!item))
		})
		arrFiles.forEach(file => {
			let text = fs.readFileSync(file, 'utf8')

			for (var p in settings.replacedWords) {
				text = text.replace(new RegExp(p, 'g'), settings.replacedWords[p])
			}

			for (var p in settings.replacedWords) {
				file = file.replace(new RegExp(p, 'g'), settings.replacedWords[p])
			}
			to_path = to_path[to_path.length - 1] === '/' ? to_path : to_path + '/'
			let fileName = to_path + file;
			fs.writeFileSync(fileName, text);
		})
	}
}

function mkDirToPath(path_string) {

	let obj = path.parse(path_string)
	if (obj.ext === '') {
		let names = path_string.split('/');
		let new_path = names[0];
		if (!fs.existsSync(new_path)) {
			fs.mkdirSync(new_path)
		}
		for (var i = 1; i < names.length; i++) {
			new_path = new_path + "/" + names[i]
			if (!fs.existsSync(new_path)) {
				fs.mkdirSync(new_path)
			}
		}
	} else {
		throw new Error('to_path is incorrect!')
	}

}
module.exports.createClone = createClone;
