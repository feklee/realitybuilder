({
    appDir: 'scripts',
    baseUrl: '.',
    dir: 'scripts.build',
    removeCombined: true,
    optimize: 'none', // fixme: uglify
    paths: {
        'requireLib': '../node_modules/requirejs/require'
    },
    wrap: {
        startFile: 'scripts.build.start.js',
        endFile: 'scripts.build.end.js'
    },
    modules: [{
        name: 'main',
        include: 'requireLib'
    }]
})
