module.exports = {
    configureWebpack: {
      devtool: 'source-map',
      resolve:{
        alias:{
          'home':'@/views/home'
        }
      }
    }
  }