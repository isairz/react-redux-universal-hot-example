require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'HYU Print',
    description: '카피 한 장의 여유',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'HYU Print',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'ko_KR',
        'og:title': 'HYU Print',
        'og:description': '카피 한 장의 여유',
      }
    }
  }
}, environment);
