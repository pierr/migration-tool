var pick = require('lodash');
var dir = require('node-dir');
var assign = require('object-assign');
var fs = require('fs');
var toCheck = [/\.common\.button\.action/, /button/, /\.common\.icon/, /icon/];
var errors = {};
function _createMigrationReport(data, outputFilename){
    fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("migration-report.json saved to " + outputFilename);
        }
    });
}
dir.readFiles(process.argv[2],
    {match: /\.(jsx|js)$/},
    function eachFileCb(err, content, filename, next) {

        errors[filename] = [];
        if (err) {throw err;}
        toCheck.forEach(function(toCh){
var matches =content.match(toCh);
            if(matches !== null){
                errors[filename].push(matches);
            }
        });
        if(errors[filename].length === 0){
            delete errors[filename];
        }
        next();
    },
    function finishCb(err, files){
        if (err) {throw err;}
            console.log('finished reading files:', files);
            // console.log('components', components);
        _createMigrationReport(errors, './migration-report.json')
});
