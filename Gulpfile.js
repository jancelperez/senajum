// los require le decimos que en el directorio node_modules traiganos los archivos y guardelos en la variables dichas
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

//va hacer una tarea primer parametro nombre segundo que va hacer 
gulp.task('styles', function(){
    gulp
        //toma el archivo scss
        .src('index.scss')
        //paselo por sass
        .pipe(sass())
        //con este pipe es para renombrar el archivo generado por el gulp
        .pipe(rename('app.css'))
        //donde lo va a poner
        .pipe(gulp.dest('public'));
})


gulp.task('assets', function(){
    gulp
        // toma todos los archivos de assets 
        .src('assets/*')
        //con este envia los archivos a la carpeta public
        .pipe(gulp.dest('public'));
})


function compile(watch){
    //baunle es una variable que recibe un objeto que nos va a permirtir escuchar cada vez que pase al gun cambio en los archivos 
    //con watchify estamos escuchando los archivos
    var bundle = watchify(browserify('./src/index.js'/*transforme el archivo index.js utilizando browserify */)) 

    //para que gulp procese por nosotros el index.js y lo coloque en la carpeta public
    function rebundle(){
        bundle
        //para utilizar las caracteristicas de emmascript
        //{presets: ['es2015'], plugins: ['syntax-async-function', 'transform-regenerator'] }para poder utilizar los present en la homepage
        //tambien es para incluir dentro de la libreria babel los plugin async y regenerator 
        .transform(babel, { presets: ['es2015'], plugins: ['syntax-async-functions', 'transform-regenerator'] })
        //llama la funcion bundle de browserify genere el budle
        .bundle()
        //verificar errores 
        .on('error', function(err){
            console.log(err);
            this.emit('end');
        })
        //transformar de browserify a Gulp para que gulp pueda seguir procesando este archivo
        .pipe(source('index.js'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('public'));
    }

    if(watch){
        // el metodo on recibe dos parametros un nombre y una funcion
        //esta funcion see ejecutara cada vez que suceda en update osea que se actualizen el archivo index.js
        bundle.on('update',function(){
            console.log('--> Ha realizado un cambio');
            //llamamos a la funcion rebundle
            rebundle();
        })
    }

    rebundle();
}

gulp.task('build', function(){
    return compile();
});

//este viendo que hallan cambios en ciertos archivos para que haga el build es correr gulp watch
gulp.task('watch', function(){
    return compile(true);
});

//tarea que va a realizar cuando ejecutemos el comando gulp en node
gulp.task('default',['styles','assets','build']);

