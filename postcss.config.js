module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-for'),
        require('postcss-each'),
        require('postcss-nested'),
        require('postcss-mixins'),
        require('postcss-simple-vars'),
        require('autoprefixer'),
        require('postcss-easings'),
        require("postcss-url"),
        require('cssnext')
    ]
}