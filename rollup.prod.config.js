import typescript from 'rollup-plugin-typescript';
import alias from 'rollup-plugin-alias';
import uglify from 'rollup-plugin-uglify';

export default {
    input: './index.ts',
    output: {
        file: './dist/beast.min.js',
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