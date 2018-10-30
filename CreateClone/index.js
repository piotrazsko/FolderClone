const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf')

function createClone(arr) {
	let files = rimraf.sync('result/src')
	arr.forEach(item => {
		createCloneDir(item)
	})
}

function createCloneDir(settings) {
	console.log(settings);

	let allDirs = getAllDirs(['src']);


	let newDirs = createNewDirs(allDirs);

	createNewFiles(allDirs)

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


	function createNewDirs(dirs) {
		dirs = Array.from(new Set(dirs));
		let newNames = []
		dirs.forEach(item => {
			for (var p in settings.replacedWords) {
				item = item.replace(new RegExp(p, 'g'), settings.replacedWords[p])
			}
			newNames.push(item)
			let nameDir = 'result/' + item;
			if (!fs.existsSync(nameDir)) {
				fs.mkdirSync(nameDir)
			}
		})
		return newNames
	}


	function createNewFiles(dirs) {
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
			let fileName = 'result/' + file;
			fs.writeFileSync(fileName, text);
		})
	}
}
module.exports.createClone = createClone;
