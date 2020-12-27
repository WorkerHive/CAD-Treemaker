// examples taken from https://www.npmjs.com/package/gltf-pipeline
// could be helpful converting objects for this package.

//Converting a glTF to glb:
/*
const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const gltfToGlb = gltfPipeline.gltfToGlb;
const gltf = fsExtra.readJsonSync('model.gltf');
gltfToGlb(gltf)
    .then(function(results) {
        fsExtra.writeFileSync('model.glb', results.glb);
    });
 */

//Converting a glb to glTF
/*
const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const glbToGltf = gltfPipeline.glbToGltf;
const glb = fsExtra.readFileSync('model.glb');
glbToGltf(glb)
    .then(function(results) {
        fsExtra.writeJsonSync('model.gltf', results.gltf);
    });
*/

//Converting a glTF to Draco glTF
/*
const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const processGltf = gltfPipeline.processGltf;
const gltf = fsExtra.readJsonSync('model.gltf');
const options = {
    dracoOptions: {
        compressionLevel: 10
    }
};
processGltf(gltf, options)
    .then(function(results) {
        fsExtra.writeJsonSync('model-draco.gltf', results.gltf);
    });
*/