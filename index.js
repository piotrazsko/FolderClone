const fs = require('fs');
const map_path =  process.argv[2]|| './map_project.json';
const settings = require(map_path)
const  from_path = settings.from;
const  to_path = settings.to;
const path = require('path');
const rimraf = require('rimraf')

const  tree =  settings.tree;
const {createClone} = require("./CreateClone/index.js")

createClone(tree,from_path,to_path)
