module.exports = {
    apps: [
        {
            name: 'mobi-music-back-nest',
            script: 'dist/main.js',
            cwd: '/var/www/megamusic.back.nest',
            autorestart: true,
            watch: false,
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                PORT: 4000,
            },
        },
    ],
};
