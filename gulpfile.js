var elixir = require('laravel-elixir');

require('laravel-elixir-vueify');

elixir(function (mix) {
    mix.sass('app.scss', 'build/app.css')
        .browserify('app.js', 'build/app.js')
        // Serve the app from base dir and php -S 0.0.0.0:8888 -t public
        .browserSync({ proxy: 'http://localhost:8888' }); 
});
