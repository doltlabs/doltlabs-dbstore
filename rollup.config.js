import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

// Function to generate version number
function generateVersion() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  return `${year}.${month}.${commitHash}`;
}

// Custom Rollup plugin to update block header comment and rename the output file
function updateHeaderAndRename() {
  return {
    name: 'update-header-and-rename',
    generateBundle(options, bundle) {
      const version = generateVersion();
      const originalFileName = options.file;
      const ext = path.extname(originalFileName);
      const baseName = path.basename(originalFileName, ext);
      const newFileName = `${baseName}.${version}${ext}`;
      const headerComment = `/**
 * DoltStore - A lightweight JavaScript library for building offline-first applications
 * Version: ${version}
 * File: ${newFileName}
 */
`;

      for (const [fileName, chunkOrAsset] of Object.entries(bundle)) {
        if (chunkOrAsset.type === 'chunk') {
          chunkOrAsset.code = headerComment + chunkOrAsset.code;
          // Rename the file in the bundle
          delete bundle[fileName];
          bundle[newFileName] = chunkOrAsset;
        }
      }

      // Update the output file option to the new file name
      options.file = path.join(path.dirname(originalFileName), newFileName);
    }
  };
}

export default {
  input: 'src/index.js',  // Adjust this to your entry file
  output: {
    file: 'dist/doltstore.js',  // Initial output file location
    format: 'umd',  // UMD format for a single bundle (Universal Module Definition)
    name: 'DoltStore',  // The global variable name for your library
  },
  plugins: [
    resolve(),  // Resolves node_modules
    commonjs(), // Converts CommonJS modules to ES6
    updateHeaderAndRename() // Custom plugin to update header and rename file
  ],
};