var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header= require('../header');
var axios = require('axios');
var Webcam = require('webcamjs');
var picture = require('../picture-card');

//el parametro header es para agregar el header al DOM de esa la ruta 
//loadPictures es para agregar las pictures en el DOM 
page('/', header, loading, loadPictures, function(ctx, next){
    //agrega el titulo de la pestaña
    title('Senagram');
    //busca en el dom osea en el navegador el elemto que tenga el id main-container
    var main = document.getElementById('main-container1');

    //empty: vacia el contenido de main y despues  ingresa el contendido de el template dentro de main 
    //appendChild:convierte el elemento  en hijo de main main es el contenedor y dentro del contenedor va las pictures
    empty(main).appendChild(template(ctx.pictures));

    const picturePreview = $('#picture-preview');
    const camaraInput = $('#camara-input');
    const cancelPicture = $('#cancelPicture');
    const shootButton = $('#shoot');
    const uploadButton = $('#uploadButton');

    function reset(){
        picturePreview.addClass('hide');
        cancelPicture.addClass('hide');
        uploadButton.addClass('hide');
        shootButton.removeClass('hide');
        camaraInput.removeClass('hide');
    }

    cancelPicture.click(reset);
    

    //para abrir el modal cuando oprima el boton
    $('#modalCamara').modal(
        {
            ready: function(){
                Webcam.attach('#camara-input');

                shootButton.click((ev)=>{
                    Webcam.snap( (data_uri) => {
                		picturePreview.html(`<img src="${data_uri}"/>`);
                        picturePreview.removeClass('hide');
                        cancelPicture.removeClass('hide');
                        uploadButton.removeClass('hide');
                        shootButton.addClass('hide');
                        camaraInput.addClass('hide');
                        uploadButton.off('click');
                        uploadButton.click(()=>{
                            const pic = {
                                url:data_uri,
                                likes:0,
                                liked: false,
                                createdAt: +new Date(),
                                user: {
                                    username: 'Phoemix',
                                    avatar: 'https://lh3.googleusercontent.com/-3O0uMgYVCnY/VxBtb9OpaCI/AAAAAAAAAE4/PBQGu7lE4bUQkWdEF7u_OpH_G8CAaESgACEw/w140-h140-p/cerro.jpg',
                                }               
                            }
                            $('#picture-card').prepend(picture(pic));
                            reset();
                            $('#modalCamara').modal('close')
                        })
	                });
                })
            },
            complete: function() { 
                Webcam.reset();
                reset();
            }
        }
    );

})  

//esta funcion es para colocar a cargar la antes de que aparesca 
function loading(ctx, next){
    var el = document.createElement('div');
    el.classList.add('loader');
    document.getElementById('main-container1').appendChild(el);
    next();    
}
//para cargar las imagenes desde el servidor de manera asincronica
function loadPictures(ctx, next){
    
    request
        .get('/api/pictures')
        .end(function(err, res){

            //si es error muestre en consola el error
            if(err) return console.log(err);

            //va acontener lo que nos envia el servidor en este caso las pictures 
            ctx.pictures = res.body;
            next();
        })
}

//para cargar las imagenes desde el servidor con la libreria axios de manera asincronica
function loadPicturesAxios(ctx, next){
    
    axios
        .get('/api/pictures')
        .then(function(res){
            //va acontener lo que nos envia el servidor en este caso las pictures 
            ctx.pictures = res.data;
            next();          
        })
        .catch(function (err){
            console.log(err);
        })
}

//para cargar las imagenes desde el servidor con la libreria Fetch de manera asincronica
function loadPicturesFetch (ctx, next){
    //fetch nos devuelve una promesa 
    fetch('/api/pictures')
        //res.json obtiene los datos que nos devuelve el servidor y los combierte en json
        .then(function(res) {
            return res.json();
        })
        //vamos a obtener las pictures
        .then(function (pictures){
            ctx.pictures=pictures;
            next();
        })
        .catch(function (err){
            console.log(err);
        })
}

////para cargar las imagenes desde el servidor con la libreria Fetch de manera asincronica
//la palabra async es para que reconosca el try catch
async function asyncload(ctx, next){
    try {
        //await va a detener la ejecucion del proceso hasta que se cumpla la promesa fetch('/api/pictures')
        ctx.pictures = await fetch('/api/pictures')
        //es una forma abreviada de .then(function (res){return res.json()})
        .then (res => res.json())
        next();

    }catch (err) {
        return console.log(err);
    }
}