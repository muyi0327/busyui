import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import serve from 'rollup-plugin-serve'
import autoprefixer from 'autoprefixer'
import pkg from './package.json'

import {
    libraryName,
    globalName,
    prefix,
    prefixCls
} from './src/config'

import {
    src,
    dest,
    packages
} from './src/base'

// 自定义样式
let banner = `/**\n * ${globalName} framework version ${pkg.version} \n **/`;
let dist = dest
let destCss = `${dist}/${libraryName}.css`
let destJs = `${dist}/${libraryName}.js`


// format json to sass varible
const parseJsonToSass = (data) => {
    data = typeof data === 'string' ? JSON.parse(data) : data;
    return Object.keys(data).map((d) => {
        //return '$' + d + ':' + data[d] + ';\n'
        return `$${d}:${data[d]};\n`
    }).join('')
}

export default {
    input: `${src}/index.js`,
    output: {
        file: destJs,
        format: 'iife',
        name: globalName,
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
        include: [`${src}/**`, `${packages}/**`]
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
                        data: parseJsonToSass({
                            prefix,
                            prefixCls
                        })
                    }
                },
                postcssPlugins: [
                    autoprefixer()
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
                    // 强制编译到es5
                    forceAllTransforms: true
                }]
            ],
            plugins: [
                '@babel/plugin-transform-object-assign',
                '@babel/plugin-proposal-class-properties'
            ],
            exclude: '/node_modules/**',
            include: [`${src}/**`, `${packages}/**`]
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
