var webpack = require('webpack')
var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      Visibility: 'visibilityjs',
      Cookies: 'js-cookie',
      key: 'keymaster',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      moment: 'moment',
      Handlebars: 'handlebars'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font', 'index-styles', 'index'],
      filename: path.join(__dirname, 'public/views/build/index-header.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font-pack', 'index-styles-pack', 'index-styles', 'index'],
      chunksSortMode: 'manual',
      filename: path.join(__dirname, 'public/views/build/index-pack-header.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['index'],
      filename: path.join(__dirname, 'public/views/build/index-scripts.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['common', 'index-pack'],
      chunksSortMode: 'manual',
      filename: path.join(__dirname, 'public/views/build/index-pack-scripts.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font', 'cover'],
      chunksSortMode: 'manual',
      filename: path.join(__dirname, 'public/views/build/cover-header.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font-pack', 'cover-styles-pack', 'cover'],
      chunksSortMode: 'manual',
      filename: path.join(__dirname, 'public/views/build/cover-pack-header.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['cover'],
      filename: path.join(__dirname, 'public/views/build/cover-scripts.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['common', 'cover-pack'],
      chunksSortMode: 'manual',
      filename: path.join(__dirname, 'public/views/build/cover-pack-scripts.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font', 'pretty-styles', 'pretty'],
      chunksSortMode: 'manual',
      filename: path.join(__dirname, 'public/views/build/pretty-header.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font-pack', 'pretty-styles-pack', 'pretty-styles', 'pretty'],
      chunksSortMode: 'manual',
      filename: path.join(__dirname, 'public/views/build/pretty-pack-header.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['pretty'],
      filename: path.join(__dirname, 'public/views/build/pretty-scripts.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['common', 'pretty-pack'],
      chunksSortMode: 'manual',
      filename: path.join(__dirname, 'public/views/build/pretty-pack-scripts.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font', 'slide-styles', 'slide'],
      chunksSortMode: 'manual',
      filename: path.join(__dirname, 'public/views/build/slide-header.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/header.ejs',
      chunks: ['font-pack', 'slide-styles-pack', 'slide-styles', 'slide'],
      chunksSortMode: 'manual',
      filename: path.join(__dirname, 'public/views/build/slide-pack-header.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['slide'],
      filename: path.join(__dirname, 'public/views/build/slide-scripts.ejs'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/views/includes/scripts.ejs',
      chunks: ['slide-pack'],
      filename: path.join(__dirname, 'public/views/build/slide-pack-scripts.ejs'),
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        context: path.join(__dirname, 'node_modules/mathjax'),
        from: {
          glob: '**/*',
          dot: false
        },
        to: 'MathJax/'
      },
      {
        context: path.join(__dirname, 'node_modules/emojify.js'),
        from: {
          glob: 'dist/**/*',
          dot: false
        },
        to: 'emojify.js/'
      },
      {
        context: path.join(__dirname, 'node_modules/reveal.js'),
        from: 'js',
        to: 'reveal.js/js'
      },
      {
        context: path.join(__dirname, 'node_modules/reveal.js'),
        from: 'css',
        to: 'reveal.js/css'
      },
      {
        context: path.join(__dirname, 'node_modules/reveal.js'),
        from: 'lib',
        to: 'reveal.js/lib'
      },
      {
        context: path.join(__dirname, 'node_modules/reveal.js'),
        from: 'plugin',
        to: 'reveal.js/plugin'
      }
    ])
  ],
  entry: {
    font: path.join(__dirname, 'public/css/google-font.css'),
    'font-pack': path.join(__dirname, 'public/css/font.css'),
    common: [
      'expose-loader?jQuery!expose-loader?$!jquery',
      'velocity-animate',
      'imports-loader?$=jquery!jquery-mousewheel',
      'bootstrap'
    ],
    cover: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      path.join(__dirname, 'public/js/cover.js')
    ],
    'cover-styles-pack': [
      path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
      path.join(__dirname, 'node_modules/font-awesome/css/font-awesome.min.css'),
      path.join(__dirname, 'public/css/bootstrap-social.css'),
      path.join(__dirname, 'node_modules/select2/select2.css'),
      path.join(__dirname, 'node_modules/select2/select2-bootstrap.css')
    ],
    'cover-pack': [
      'core-js/stable',
      'regenerator-runtime/runtime',
      'bootstrap-validator',
      'expose-loader?select2!select2',
      'expose-loader?moment!moment',
      'script-loader!js-url',
      path.join(__dirname, 'public/js/cover.js')
    ],
    index: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      'script-loader!jquery-ui-resizable',
      'script-loader!js-url',
      'expose-loader?filterXSS!xss',
      'expose-loader?LZString!lz-string',
      'script-loader!codemirror',
      'script-loader!inlineAttachment',
      'script-loader!jqueryTextcomplete',
      'script-loader!codemirrorSpellChecker',
      'script-loader!codemirrorInlineAttachment',
      'script-loader!ot',
      'flowchart.js',
      'imports-loader?Raphael=raphael!js-sequence-diagrams',
      'expose-loader?RevealMarkdown!reveal-markdown',
      path.join(__dirname, 'public/js/google-drive-upload.js'),
      path.join(__dirname, 'public/js/google-drive-picker.js'),
      path.join(__dirname, 'public/js/index.js')
    ],
    'index-styles': [
      path.join(__dirname, 'public/vendor/jquery-ui/jquery-ui.min.css'),
      path.join(__dirname, 'public/vendor/codemirror-spell-checker/spell-checker.min.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/lib/codemirror.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/addon/fold/foldgutter.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/addon/display/fullscreen.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/addon/dialog/dialog.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/addon/scroll/simplescrollbars.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/addon/search/matchesonscrollbar.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/theme/monokai.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/theme/one-dark.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/mode/tiddlywiki/tiddlywiki.css'),
      path.join(__dirname, 'node_modules/@hackmd/codemirror/mode/mediawiki/mediawiki.css'),
      path.join(__dirname, 'public/css/github-extract.css'),
      path.join(__dirname, 'public/vendor/showup/showup.css'),
      path.join(__dirname, 'public/css/mermaid.css'),
      path.join(__dirname, 'public/css/markdown.css'),
      path.join(__dirname, 'public/css/slide-preview.css')
    ],
    'index-styles-pack': [
      path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
      path.join(__dirname, 'node_modules/font-awesome/css/font-awesome.min.css'),
      path.join(__dirname, 'public/css/bootstrap-social.css'),
      path.join(__dirname, 'node_modules/ionicons/css/ionicons.min.css'),
      path.join(__dirname, 'node_modules/octicons/octicons/octicons.css')
    ],
    'index-pack': [
      'core-js/stable',
      'regenerator-runtime/runtime',
      'expose-loader?Spinner!spin.js',
      'script-loader!jquery-ui-resizable',
      'bootstrap-validator',
      'expose-loader?jsyaml!js-yaml',
      'script-loader!mermaid',
      'expose-loader?moment!moment',
      'script-loader!js-url',
      'script-loader!handlebars',
      'expose-loader?hljs!highlight.js',
      'expose-loader?emojify!emojify.js',
      'expose-loader?filterXSS!xss',
      'script-loader!gist-embed',
      'expose-loader?LZString!lz-string',
      'script-loader!codemirror',
      'script-loader!inlineAttachment',
      'script-loader!jqueryTextcomplete',
      'script-loader!codemirrorSpellChecker',
      'script-loader!codemirrorInlineAttachment',
      'script-loader!ot',
      'flowchart.js',
      'imports-loader?Raphael=raphael!js-sequence-diagrams',
      'expose-loader?Viz!viz.js',
      'script-loader!abcjs',
      'expose-loader?io!socket.io-client',
      'expose-loader?RevealMarkdown!reveal-markdown',
      path.join(__dirname, 'public/js/google-drive-upload.js'),
      path.join(__dirname, 'public/js/google-drive-picker.js'),
      path.join(__dirname, 'public/js/index.js')
    ],
    pretty: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      'expose-loader?filterXSS!xss',
      'flowchart.js',
      'imports-loader?Raphael=raphael!js-sequence-diagrams',
      'expose-loader?RevealMarkdown!reveal-markdown',
      path.join(__dirname, 'public/js/pretty.js')
    ],
    'pretty-styles': [
      path.join(__dirname, 'public/css/github-extract.css'),
      path.join(__dirname, 'public/css/mermaid.css'),
      path.join(__dirname, 'public/css/markdown.css'),
      path.join(__dirname, 'public/css/slide-preview.css')
    ],
    'pretty-styles-pack': [
      path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
      path.join(__dirname, 'node_modules/font-awesome/css/font-awesome.min.css'),
      path.join(__dirname, 'node_modules/ionicons/css/ionicons.min.css'),
      path.join(__dirname, 'node_modules/octicons/octicons/octicons.css')
    ],
    'pretty-pack': [
      'expose-loader?jsyaml!js-yaml',
      'script-loader!mermaid',
      'expose-loader?moment!moment',
      'script-loader!handlebars',
      'expose-loader?hljs!highlight.js',
      'expose-loader?emojify!emojify.js',
      'expose-loader?filterXSS!xss',
      'script-loader!gist-embed',
      'flowchart.js',
      'imports-loader?Raphael=raphael!js-sequence-diagrams',
      'expose-loader?Viz!viz.js',
      'script-loader!abcjs',
      'expose-loader?RevealMarkdown!reveal-markdown',
      path.join(__dirname, 'public/js/pretty.js')
    ],
    slide: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      'bootstrap-tooltip',
      'expose-loader?filterXSS!xss',
      'flowchart.js',
      'imports-loader?Raphael=raphael!js-sequence-diagrams',
      'expose-loader?RevealMarkdown!reveal-markdown',
      path.join(__dirname, 'public/js/slide.js')
    ],
    'slide-styles': [
      path.join(__dirname, 'public/vendor/bootstrap/tooltip.min.css'),
      path.join(__dirname, 'public/css/github-extract.css'),
      path.join(__dirname, 'public/css/mermaid.css'),
      path.join(__dirname, 'public/css/markdown.css')
    ],
    'slide-styles-pack': [
      path.join(__dirname, 'node_modules/font-awesome/css/font-awesome.min.css'),
      path.join(__dirname, 'node_modules/ionicons/css/ionicons.min.css'),
      path.join(__dirname, 'node_modules/octicons/octicons/octicons.css')
    ],
    'slide-pack': [
      'core-js/stable',
      'regenerator-runtime/runtime',
      'expose-loader?jQuery!expose-loader?$!jquery',
      'velocity-animate',
      'imports-loader?$=jquery!jquery-mousewheel',
      'bootstrap-tooltip',
      'expose-loader?jsyaml!js-yaml',
      'script-loader!mermaid',
      'expose-loader?moment!moment',
      'script-loader!handlebars',
      'expose-loader?hljs!highlight.js',
      'expose-loader?emojify!emojify.js',
      'expose-loader?filterXSS!xss',
      'script-loader!gist-embed',
      'flowchart.js',
      'imports-loader?Raphael=raphael!js-sequence-diagrams',
      'expose-loader?Viz!viz.js',
      'script-loader!abcjs',
      'headjs',
      'expose-loader?Reveal!reveal.js',
      'expose-loader?RevealMarkdown!reveal-markdown',
      path.join(__dirname, 'public/js/slide.js')
    ]
  },

  output: {
    path: path.join(__dirname, 'public/build'),
    publicPath: '/build/',
    filename: '[name].js'
  },

  resolve: {
    alias: {
      codemirror: '@hackmd/codemirror/codemirror.min.js',
      inlineAttachment: path.join(__dirname, 'public/vendor/inlineAttachment/inline-attachment.js'),
      jqueryTextcomplete: path.join(__dirname, 'public/vendor/jquery-textcomplete/jquery.textcomplete.js'),
      codemirrorSpellChecker: path.join(__dirname, 'public/vendor/codemirror-spell-checker/spell-checker.min.js'),
      codemirrorInlineAttachment: path.join(__dirname, 'public/vendor/inlineAttachment/codemirror.inline-attachment.js'),
      ot: path.join(__dirname, 'public/vendor/ot/ot.min.js'),
      mermaid: 'mermaid/dist/mermaid.min.js',
      handlebars: 'handlebars/dist/handlebars.min.js',
      'jquery-ui-resizable': path.join(__dirname, 'public/vendor/jquery-ui/jquery-ui.min.js'),
      'gist-embed': 'gist-embed/gist-embed.min.js',
      'bootstrap-tooltip': path.join(__dirname, 'public/vendor/bootstrap/tooltip.min.js'),
      headjs: 'reveal.js/lib/js/head.min.js',
      'reveal-markdown': path.join(__dirname, 'public/js/reveal-markdown.js'),
      abcjs: path.join(__dirname, 'public/vendor/abcjs_basic_3.1.1-min.js'),
      'js-sequence-diagrams': path.join(__dirname, 'node_modules/@hackmd/js-sequence-diagrams/build/main.js')
    }
  },

  externals: {
    'viz.js': 'Viz',
    'socket.io-client': 'io',
    jquery: '$',
    moment: 'moment',
    handlebars: 'Handlebars',
    'highlight.js': 'hljs',
    select2: 'select2'
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/, /public\/vendor/]
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'sass-loader'
      ]
    }, {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'less-loader'
      ]
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'string-loader'
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'url-loader',
          options: { prefix: 'font/&limit=5000' }
        }
      ]
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit: '5000', mimetype: 'application/octet-stream' }
      }]
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit: '10000', mimetype: 'svg+xml' }
      }]
    }, {
      test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit: '10000', mimetype: 'image/png' }
      }]
    }, {
      test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: { limit: '10000', mimetype: 'image/gif' }
      }]
    }]
  },

  node: {
    fs: 'empty'
  },

  stats: {
    assets: false
  }
}
