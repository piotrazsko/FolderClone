const fs = require('fs');
const settings = require('./map_project.json')
const path = require('path');
const rimraf = require('rimraf')





let files = rimraf.sync('./result/src')
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
		fs.mkdirSync('./result/' + item)
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
	console.log(arrFiles);
	arrFiles.forEach(file => {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) throw err;
			let text = data;

			for (var p in settings.replacedWords) {
				text = text.replace(new RegExp(p, 'g'), settings.replacedWords[p])
			}

			for (var p in settings.replacedWords) {
				file = file.replace(new RegExp(p, 'g'), settings.replacedWords[p])
			}

			fs.writeFile('result/' + file, text, (err) => {
				if (err) throw err;
				console.log('The file has been saved!');
			});
		});
	})

}
