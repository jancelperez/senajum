// es lo mismo que var page = require('') solo que es la forma que emmascript 2015 lo estandarizo
import page from 'page';
import header from '../header'
import title from 'title';
import empty from 'empty-element';
import template from './template';

//el nombre de usuario lo tenemos que colocar como si fuera un parametro y para eso utilizamos los dos puntos
page('/:username', header, loadUser, function(ctx, next){
    //busca en el DOM osea en el navegador el elemto que tenga el id main-container
    var main = document.getElementById('main-container1');

    //para asignarle a la pestaña el tittulo en este caso sera Senagram y el nombre de usuario
    title(`Senagram - ${ctx.params.username}`);
    //appendChild:convierte el en hijo de main main es el contenedor y dentro del contenedor va el
    //empty: vacia el contenido de main y despues  ingresa el contendido de el template dentro de main 
    empty(main).appendChild(template(ctx.user));
})

//el nombre de usuario lo tenemos que colocar como si fuera un parametro y para eso utilizamos los dos puntos lo mismo con el id
page('/:username/:id', header, loadUser, function(ctx, next){
    //busca en el DOM osea en el navegador el elemto que tenga el id main-container
    var main = document.getElementById('main-container1');

    //para asignarle a la pestaña el tittulo en este caso sera Senagram y el nombre de usuario
    title(`Senagram - ${ctx.params.username}`);

    //appendChild:convierte el en hijo de main main es el contenedor y dentro del contenedor va el
    //empty: vacia el contenido de main y despues  ingresa el contendido de el template dentro de main 
    empty(main).appendChild(template(ctx.user));
    
    //inicialisar el modal
    $('.modal').modal({
        complete: function() { 
            page(`/${ctx.user.username}`); 
        }
    }); 

    //para que habra el modal d e la foto ver documentacion de materialize modal
    $(`#modal${ctx.params.id}`).modal('open');
})

////para cargar las imagenes desde el servidor con la libreria Fetch de manera asincronica
//la palabra async es para que reconosca el try catch

async function loadUser(ctx, next){
    try{
        //await va a detener la ejecucion del proceso hasta que se cumpla la promesa fetch('/api/pictures')
        ctx.user = await fetch(`api/user/${ctx.params.username}`)
        //es una arrow function es lo mismo que  .then(function (res){return res.json()})
        .then(res => res.json());
        //llama el siguiente milways
        next();
    }
    catch (err){
        console.log(err);
    }
}
