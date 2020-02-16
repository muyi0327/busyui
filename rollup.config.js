import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import babelrc from 'babelrc-rollup'
import serve from 'rollup-plugin-serve'
import alias from 'rollup-plugin-alias'
import autoprefixer from 'autoprefixer'
import onceImporter from 'node-sass-once-importer'
import pkg from './package.json'
import glob from 'glob'

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
let libs = `${dist}/libs`
let destJs = `${dist}/${libraryName}.js`
let destCss = `${dist}/${libraryName}.css`
let pgs = glob.sync('./packages/**/index.js')

// format json to sass varible
const parseJsonToSass = (data) => {
    data = typeof data === 'string' ? JSON.parse(data) : data;
    return Object.keys(data).map((d) => {
        return `$${d}:${data[d]};\n`
    }).join('')
}

export const base = {
    plugins: [
        alias({
            '@packages': path.resolve(__dirname, 'packages')
        }),
        resolve({
            browser: true,
            extensions: ['.js', '.scss', '.vue']
        }),
        commonjs(),
        json(),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        babel({
            // disable .babelrc
            babelrc: false,
            ...babelrc({
                addModuleOptions: false,
                addExternalHelpersPlugin: false
            }),
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
        })
    ]
}

/**
 * @desc 初始化config
 * @param {*} actiion - 'build','dev'
 */
export const getConfig = (action = 'build') => {
    let conf = { ...base }
    let paths = {}
    let external = []
    let configs = []
    let reg = /packages\/([\w-]+)(?:\/index\.js)?/

    if (action === 'libs') {
        let external = (id) => {
            return id === 'vue'
                || /^babel-runtime/.test(id)
                || pgs.some(pg => {
                    let name = reg.exec(pg)[1]
                    return new RegExp(`\\/${name}(\\/index\\.js)?$`).test(id)
                })
        }
        pgs.forEach(pg => {
            configs.push({
                input: pg,
                external,
                output: {
                    file: pg.replace('packages', libs),
                    format: 'es',
                    exports: 'named',
                    globals: {
                        vue: 'Vue'
                    },
                    strict: false,
                },
                plugins: [vue({
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
                }), scss(),
                ...conf.plugins]
            })
        })

        return configs
    }


    if (action === 'build' || action === 'dev') {
        // 入口
        conf.input = `${src}/index.js`
        // 输出
        conf.output = {
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
        }

        conf.external = (id) => {
            return id === 'vue'
        }

        // 插件
        conf.plugins = [vue({
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
        }), scss({
            output: destCss
        }), ...conf.plugins]
    }

    if (action === 'dev') {
        // 监听编译
        conf.watch = {
            clearScreen: false,
            include: [`${src}/**`, `${packages}/**`]
        }
    }

    return conf
}
