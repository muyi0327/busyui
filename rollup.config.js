import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
//import serve from 'rollup-plugin-serve'
import autoprefixer from 'autoprefixer'
import pkg from './package.json'

// 自定义样式
import variables from './themes/variables.js'

let banner = `/**\n * Wui.js framework version ${pkg.version} \n **/`;
let destCss = 'dist/wui.css';


// format json to sass varible
const parseJsonToSass = (data) => {
    data = typeof data === 'string' ? JSON.parse(data) : data;

    return Object.keys(data).map((d) => {
        //return '$' + d + ':' + data[d] + ';\n'
        return `$${d}:${data[d]};\n`
    }).join('')
}

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/wui.js',
        format: 'iife',
        name: 'Wui',
        banner: banner,
        sourceMap: true,
        globals: {
            vue: 'Vue'
        },
        exports: "named",
        strict: false
    },
    watch: {
        clearScreen: false,
        include: ['src/**', 'packages/**']
    },
    external: [
        'vue',
        'vue-router'
    ],
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),

        commonjs(),

        json(),

        scss({
            output: destCss
        }),

        vue({
            css: false,
            defaultLang: {
                style: 'scss'
            },
            style: {
                preprocessOptions: {
                    scss: {
                        data: parseJsonToSass(variables)
                    }
                },
                postcssPlugins: [
                    autoprefixer({
                        browsers: ['iOS > 7', 'Android > 4', 'last 4 Chrome versions']
                    })
                ]
            }
        }),

        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),

        babel({
            // disable .babelrc
            babelrc: false,
            runtimeHelpers: true,
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
            presets: [
                ['@babel/preset-env', {
                    modules: false,
                    targets: {
                        "browsers": [">0.25%", "not ie 11", "not op_mini all"]
                    },
                    useBuiltIns: false,
                    forceAllTransforms: true
                }]
            ],
            exclude: '/node_modules/**',
            include: ['./src/**', 'packages/**']
        }),
        // serve({
        //     open: true, // 是否打开浏览器
        //     contentBase: './', // 入口html的文件位置
        //     openPage: '/example/all/index.html',
        //     historyApiFallback: true, // Set to true to return index.html instead of 404
        //     host: 'localhost',
        //     port: 3028
        // })
    ]
}
