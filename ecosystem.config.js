require('dotenv/config');

module.exports = {
  apps: [
    {
      name: 'daniela-fidellis-api',
      script: './build/server.js',
      instances: 1,
      exec_mode: 'cluster',
      max_restarts: 500,
      max_memory_restart: '96M',
      restart_delay: 5000,
      autorestart: true,
      ignore_watch: ['node_modules'],
      watch: true,
      env: {
        ...process.env,
        NODE_ENV: 'develop',
      },
      env_production: {
        ...process.env,
        NODE_ENV: 'production',
      },
    },
  ],
};
