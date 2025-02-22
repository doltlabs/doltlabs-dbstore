import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json'assert { type: 'json' };

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/doltlabs-dbstore.js',
    format: 'umd',
    name: 'DoltDBStore',
    banner: `/*!
 * Dolt Labs DBStore - A lightweight JavaScript library that provides a wrapper around browser's localStorage
 * Version: ${pkg.version}
 */`
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};
