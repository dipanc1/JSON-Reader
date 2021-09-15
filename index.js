var glob = require("glob");
var fs = require("fs");
var DirectoryWatcher = require('directory-watcher');

glob("json/*.json", function(err, files) {
    if (err) {
        console.log("cannot read the folder, something goes wrong with glob", err);
    }

    DirectoryWatcher.createEx('json', function(err, watcher) {
        fs.watch('json', { persistent: true }, function(event, fileName) {
            console.log("File " + fileName + " is " + event + "d");
            var matters = [];
            files.forEach(function(file) {
                fs.readFile(file, 'utf8', function(err, data) { // Read each file
                    if (err) {
                        console.log("cannot read the file, something goes wrong with the file", err);
                    };
                    var obj = JSON.parse(data);
                    console.log(obj.address);
                });
            });
        });
    });

});