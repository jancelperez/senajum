var yo = require('yo-yo');
var moment = require('moment');
var translate = require('../translate');


//plantilla de la descripcion de la fot
module.exports = function PictureCard (pic){

    var oldElem;
    
    //condicional ternario ? : si picture.liked es verdadero en tonces cree la clase like si no vacio osea no la cree
    //con peso y la llaves ${} escapamos lo que es string y podemos utilizar codigo javascript en el
    //bind hace referencia a la funcion mas no la ejecuta  
    function render(picture) {
      return yo`<div class="card ${picture.liked ? 'liked' : ''}">
        <div class="card-image">
            <img class="activator" src="${picture.url}" ondblclick=${like.bind(null, null, true)}/>
            <i class="fa fa-heart like-heart ${picture.likedHeart ? 'liked' : ''}"></i>
        </div>
            <div class="card-content">
            <a href="/${picture.user.username}" class="card-title">
                <img src="${picture.user.avatar}" class="avatar"/>
                <span class="username">${picture.user.username}</span>
            </a>
            <small class="right time">${translate.date.format(picture.createdAt)}</small>
            <p>
                <a class="left" href="#" onclick=${like.bind(null, true)}><i class="fa fa-heart-o" aria-hidden="true"></i></a>
                <a class="left" href="#" onclick=${like.bind(null, false)}><i class="fa fa-heart" aria-hidden="true"></i></a>
                <span class="left likes">${translate.message('likes',{likes: picture.likes})}</span>
            </p>    
        </div>
        </div>`;
    }


    //dblclick el parametro dblclick es un boleano si hizo doble click en la foto es true si no es false
    function like(liked, dblclick){
        
        if(dblclick){
            //asignacion doble quiere decir que si hace doble click entonces 
            //pic.likedHeart es igual a pic.liked que es igual al contrario de pic.liked
            pic.likedHeart =  pic.liked = !pic.liked;
            liked = pic.liked;
        }else {
            pic.liked = liked;//decir me gusta
        }       
        pic.likes += liked ? 1 : -1//incremanta los likes en uno
        
        function doRender(){
            var newElem = render(pic);//recarga la pagina con megusta verdadero
            yo.update(oldElem, newElem);
        }

        doRender();
        
        //para decirle cuantos segundos va a estar el corazon activo cuando se le de doble click  a la imagen
        setTimeout(function(){
            pic.likedHeart = false;
            doRender();
        },1000)
        
        return false;//return false es para que no continue con el defauld del elance que es # 
    }
    
    
    oldElem = render(pic);//render nos devuelve la plantilla que hicimos arriba 
    return oldElem;
}