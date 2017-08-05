import yo from 'yo-yo';
import layout from '../layout';
import translate from '../translate';

//gracia a yo-yo este estring qu es nuestro html va ser un elemento html 
//export default es lo mismo que modolu.expots nos permite definir nuestro codigo en modoulos
//es utilizado en la standarizacion de emascript 2015
//map nos va a devolver el array con las fotos y va ejecutar la funcion que le pasemos 

export default function userPageTemplate(user){
     var el = yo`<div class="container user-page">
         <div class="row">
             <div class="col s12 m10 offset-m1 l8 offset-l2 center-align heading">
                 <div class="row">
                     <div class="col s12 m10 offset-m1 l3 offset-l3 center">
                         <img src="${user.avatar}" class="responsive-img circle"/>
                     </div>
                     <div class="col s12 m10 offset-m1 l6 left-alingn">
                         <h2 class="hide-on-large-only center-align">${user.username}</h2>
                         <h2 class="hide-on-med-and-down left-align">${user.username}</h2>
                     </div>
                 </div>
             </div>
             <div class="row">
                ${user.pictures.map(function (picture){
                    return yo`<div class="col s12 m6 l4">
                        <a href="/${user.username}/${picture.id}" class="picture-container">
                            <div class="likes"><i class="fa fa-heart corazon">${picture.likes}</i></div>
                            <img src="${picture.src}" class="picture"/>
                        </a>
                        <div id="modal${picture.id}" class="modal modal-fixed-footer">
                            <div class="modal-content">
                                <img src="${picture.src}">
                            </div>
                            <div class="modal-footer">
                                <div class="btn btn-flat likes">
                                    <i class="fa fa-heart"></i>${translate.message('likes',{likes: picture.likes})}
                                </div>
                            </div>
                        </div>
                    </div>`
                })}
             </div>
         </div>
     </div>`
    
    return layout(el);
}


