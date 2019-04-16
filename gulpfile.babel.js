import gulp, {
    series,
    parallel
} from 'gulp'
import glob from 'glob'
import del from 'del'
import rename from 'gulp-rename'
import rollupConfig from './rollup.config.js'
import uglify from 'gulp-uglify'
import csso from 'gulp-csso'
import jdtomk from 'jsdoc-to-markdown'
import colors from 'colors'

import {
    rollup
} from 'rollup'
import {
    exec
} from 'child_process'
import fs from 'fs'
import {
    connectLogger
} from 'log4js';

let buildTasks = [];
let env = process.env.NODE_ENV;
let name = 'busy'
let dist = './dist'

gulp.task('clear', (cb) => {
    del.sync([dist]);
    cb()
});

// 打包完整 busy.js 和 busy.css
gulp.task('build-dev', series('clear', async function () {
    console.log('build dev...........');
    delete rollupConfig.output
    let bundle = await rollup(rollupConfig);

    for (let t of ['cjs', 'umd', 'iife']) {
        var n = '',
            fileName;
        switch (t) {
            case 'cjs':
                n = '.commonjs';
                break;
            case 'umd':
                n = '';
                break;
            default:
                n = `.${t}`;
        }

        fileName = `${dist}/${name + n}.js`

        await bundle.write({
            file: fileName,
            format: t,
            name: 'Busy',
            exports: 'named',
            sourceMap: true,
            globals: {
                vue: 'Vue'
            }
        })

        console.log(fileName.green)
    }
}))

// 压缩 busy.js 到 busy.min.js
gulp.task('compress', series('build-dev', () => {
    return gulp.src([`${dist}/${name}.js`, `${dist}/${name}.commonjs.js`, `${dist}/${name}.iife.js`])
        .pipe(uglify({
            sourceMap: true
        }))
        .pipe(rename({
            dirname: './',
            suffix: '.min'
        }))
        .pipe(gulp.dest(dist))
}))

// 压缩css
gulp.task('cssmin', () => {
    return gulp.src(`${dist}/${name}.css`)
        .pipe(csso({
            sourceMap: true
        }))
        .pipe(rename({
            dirname: './',
            basename: `${name}.min`
        }))
        .pipe(gulp.dest(dist))
})

// 生成文档
gulp.task('api', (cb) => {
    var output = jdtomk.renderSync({
        files: './packages/**/*.{vue,js}',
        configure: './jsdoc.conf.json',
        'module-index-format': 'grouped'
    })


    jdtomk.getJsdocData({
        files: './packages/**/*.{vue,js}',
        configure: './jsdoc.conf.json',
    }).then(rst => {
        console.log(rst)
    })

    fs.writeFileSync('./docs/api.md', output);

    cb()
});

buildTasks.push('build-dev');

// 加入压缩作务
if (env === 'production') {
    buildTasks = buildTasks.concat(['compress', 'cssmin'])
}

// 打包
gulp.task('build', series(...buildTasks))

gulp.task('watch', () => {
    gulp.watch([
        'src/**/*.{js,css,scss,sass,vue}',
        'packages/**/*.{js,css,scss,sass,vue}',
        '!packages/**/node_modules/**/*.{js,vue}'
    ], series('build'))
});

gulp.task('watch-api', () => {
    gulp.watch(['packages/**/*.{vue,js}'], series('api'))
});

gulp.task('test', function (cb) {
    exec('npm test', function (err) {
        console.log('............')
        if (err) return cb(err);
        cb();
    });
});

// execute gulp version --version 0.x.x
gulp.task('vs', (cb) => {
    console.log(process.argv.slice(2))
    let version = process.argv.slice(2)[2];
    let pkgs = glob.sync('./packages/**/package.json');
    pkgs.unshift('./package.json');

    //console.log(pkgs)

    pkgs.forEach(p => {
        let pkgString = fs.readFileSync(p);
        let pkg = JSON.parse(pkgString);
        pkg.version = version;
        fs.writeFileSync(p, JSON.stringify(pkg, null, 4), err => console.log(err));
    })

    cb()
})
