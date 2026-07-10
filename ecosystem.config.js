module.exports = {
    apps: [
        {
            name: 'mobi-music-back',
            script: 'dist/main.js',
            cwd: '/var/www/megamusic.back',
            autorestart: true,
            watch: false,
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};
