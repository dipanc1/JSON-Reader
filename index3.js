// Require the nodejs file system library
var fs = require('fs');
var path = 'json';
var delCounter = 0;

// Readdir reads a path and gives an array of filenames
// to the callback handleFiles.
fs.readdir(path, handleFiles);

function handleFiles(err, files) {
    if (err) throw err;
    var i;
    var jsonFilePattern = /\.[json]+$/i;
    var fileName;
    var filePath;
    // Tells fs to read an utf-8 file.
    var fileReadOptions = {
        'encoding': 'utf-8'
    };

    for (i = 0; i < files.length; ++i) {
        fileName = files[i];
        // Check if the file has a .json extension
        if (fileName.match(jsonFilePattern)) {
            filePath = path + '/' + fileName;
            // Open the file as utf-8 and call handleJsonFile back
            // when done reading.
            fs.readFile(filePath, fileReadOptions, handleJsonFile);
        }
    }
}

function handleJsonFile(err, data) {
    if (err) throw err;
    var dataObject = JSON.parse(data);
    var i;
    var action;
    // Loop through all possible action.
    for (i = 0; i < dataObject.action.length; ++i) {
        action = dataObject.action[i];
        if (action.delete &&
            action.delete.providedAction &&
            action.delete.providedAction === 'Del') {
            // If there is a 'Del', add it to the counter.
            ++delCounter;
        }
    }
    if (delCounter > 1) {
        throw new Exception('Jsons  not valid.');
    }
}