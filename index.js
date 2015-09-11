var pick = require('lodash');
var dir = require('node-dir');
var assign = require('object-assign');
var fs = require('fs');
var errors = {};
dir.readFiles(proccess.argv[0],
    {match: /.jsx/},
    function eachFileCb(err, content, filename, next) {
        if (err) {throw err;}
    },
    function finishCb(err, files){
        if (err) {throw err;}
            //console.log('finished reading files:', files);
            // console.log('components', components);
        _createComponentJSON(components, './src/showcase/catalog/components.json')
});

function _createComponentJSON(data, outputFilename){
    fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Components.json saved to " + outputFilename);
        }
    });
}
