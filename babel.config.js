module.exports = {
  env: {
    test: {
      presets: [
        '@babel/preset-env',
        'power-assert'
      ],
      plugins: [
        'istanbul'
      ]
    }
  }
}