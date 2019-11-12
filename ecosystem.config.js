module.exports = {
  apps: [{
    name: "app",
    script: "./dist/bin/index.js",
    max_restarts: 10,
    watch: process.env.NODE_ENV == 'development' ? ['dist', 'views'] : false,
    // log_type:'json',
    // log_date_format: "DD-MM-YYYY",
    output: '/dev/null',
    error: '/dev/null',
    // log: './log/pm2/combined.outerr.log',
    // disable_logs:false,
    ignore_watch: ["node_modules"],
    env: {
      NODE_ENV: process.env.NODE_ENV,
    }
  }]
}