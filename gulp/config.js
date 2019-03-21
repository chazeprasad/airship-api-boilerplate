var buildDir =  './bin'

export default {
    sourceDir: './src/',
    buildDir: buildDir,
    tsConfig: './tsconfig.json',
    ts: {
        src: 'src/**/*.ts',
        dest: buildDir + '/'
    },
    assets: {
        src: ['src/**/*.json', 'src/**/.env', 'src/**/*.yaml'],
        dest: buildDir + '/'
    },
    html: {
        src: ['public/**/*'],
        dest: buildDir + '/public'
    },
    init: function () {
        return this;
    }
}.init();
