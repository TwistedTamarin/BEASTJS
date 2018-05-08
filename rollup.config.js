import typescript from 'rollup-plugin-typescript';
import alias from 'rollup-plugin-alias';
import server from 'rollup-plugin-server';
import livereload from 'rollup-plugin-livereload'
import uglify from 'rollup-plugin-uglify';

export default {
    input: './index.ts',
    output: {
        file: './dist/beast.js',
        format: 'umd',
        name: 'BEAST',
        sourcemap: true
    },
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        alias({ '@BEAST': __dirname + '/core' }),
        server({
            open: true,
            contentBase: `./`,
        }),
        livereload({
            watch: 'core',
            verbose: true,
        }),
        //uglify({})
    ]
};