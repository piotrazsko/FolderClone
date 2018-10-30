const fs = require('fs');
const settings = require('./map_project.json')
const path = require('path');
const rimraf = require('rimraf')

const  tree =  settings.tree;
const {createClone} = require("./CreateClone/index.js")

createClone(tree)
