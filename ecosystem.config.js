module.exports = {
  apps: [{
    name: 'todo_api',
    script: './src/app.js',
    instances: 1,// 启动实例个数
    autorestart: true,
    max_memory_restart: '1G',
    watch: false
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
