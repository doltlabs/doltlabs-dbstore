import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'index.js',
    output: {
        file: 'dist/doltstore.js',
        format: 'iife',
        name: 'DoltStore' // Global name for the library
    },
    plugins: [resolve()]
};
