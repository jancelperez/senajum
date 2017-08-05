var yo = require('yo-yo');
var translate = require('../translate');

 var el = yo`<footer class="site-footer">
            <div class="container">
                <div class="row">
                    <div class="col s12 l3 center-align">
                        <a href="#" data-activates="dropdown1" class="dropdown-button btn-flat"> ${translate.message('language')}</a>
                        <ul id="dropdown1" class="dropdown-content">
                            <li>
                                <a href="#" onclick=${lang.bind(null,'es')}>${translate.message('spanish')}</a>
                            </li>    
                            <li>
                                <a href="#" onclick=${lang.bind(null,'en-US')}>${translate.message('english')}</a>
                             </li>
                         </ul>
                    </div>     
                    <div class="col s12 l3 push-l6 center-aling">
                        |	©2016 Senagram
                    </div>
                </div>    
            </div>
 </footer>`;               

//cambia el idioma cada vez que seleciones un tipo de idioma 
function lang(locale){
    localStorage.locale = locale;
    //recargar la pagina para que tome los cambios
    location.reload();
    //para que no aparesca el # en la barra de navegacion cuando demos click en el idioma
    return false;
}
//asigna al body el footer con la funcion appendChild                    
document.body.appendChild(el);  
