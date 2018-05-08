import typescript from 'rollup-plugin-typescript';
import alias from 'rollup-plugin-alias';
import server from 'rollup-plugin-server';
import livereload from 'rollup-plugin-livereload'
import uglify from 'rollup-plugin-uglify';

export default {
    input: './index.ts',
    output: {
        file: './dist/.js',
        format: 'umd',
        name: 'BEAST',
        sourcemap: false
    },
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        alias({ '@BEAST': __dirname + '/core' }),
        uglify()
    ]
};