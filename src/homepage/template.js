var yo = require('yo-yo');
var layout = require('../layout');
var picture = require('../picture-card');
var translate = require('../translate').message;
var request = require('superagent')

//gracia a yo-yo este estring qu es nuestro html va ser un elemento html 
//modolu.expots nos permite definir nuestro codigo en modoulos
//podemos exportar funciones para agregaralas a los contenidos
// todos los array tienen la funcion map que ejecuta algo por cada uno de los elementos que tiene
//la funcio map recibe por parametro la funcion que se va ejecutar por cada uno de los elementos
//la propieda enctype para que se pueda procesar el archivo que se qiere subir
//debe tener el atributo "multipart/form-data"

module.exports = function (pictures){
    var elem = yo`
       <div class="container timeline">

            <div id="modalCamara" class="modal  modalCamara center-align">
               <div class="modal-content">
                    <div class="camara-picture" id="camara-input">camara</div>
                    <div class="camara-picture hide" id="picture-preview"></div>
               </div>
               <div class="modal-footer">
                  <button class="waves-effect waves-light btn" id="shoot">
                    <i class="fa fa-camera"></i>
                  </button>
                  <button class="waves-effect waves-light cyan btn hide" id="uploadButton">
                    <i class="fa fa-cloud-upload"></i>
                  </button>
                  <button class="waves-effect waves-light red btn hide" id="cancelPicture">
                    <i class="fa fa-times"></i>
                  </button>
               </div>
            </div>
       
       
            <div class="row">
                <div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
                    <form enctype="multipart/form-data" class="form-upload" id="formUpload" onsubmit=${onsubmit}>
                        <a data-target="modalCamara" class="waves-effect waves-light btn" href="#modalCamara">
                            <i class="fa fa-camera"></i>
                        </a> 
                        <a href="#" >
                        
                        </a>
                        <div id="fileName" class="fileUpload btn btn-flat cyan">
                            <span><i class="fa fa-cloud-upload" aria-hidden="true"></i>${translate('upload-picture')}</span>
                            <input name="picture" id="file" type="file" class="upload" onchange=${onchange} />
                        </div>                        
                        <button id="btnUpload" type="submit" class="btn btn-flat cyan hide">${translate('upload')}</button>
                        <button id="btnCancel" type="button" class="btn btn-flat red hide" onclick=${cancel}><i class="fa fa-times" aria-hidden="true"></i></button>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m10 offset-m1 l6 offset-l3" id="picture-card">
                    ${pictures.map(function (pic) {
                        return picture(pic);
                    })}
                 </div>
            </div>
        </div>`;
 
    //funcion para agregar la clase hide a los botones
    //classList.toggle le estamos diciendo que si no tiene la clase hide agregela y si la tiene quitela
    function toggleButtons(){
        document.getElementById('fileName').classList.toggle('hide');
        document.getElementById('btnUpload').classList.toggle('hide');
        document.getElementById('btnCancel').classList.toggle('hide'); 
     }

function cancel(){
    toggleButtons();
    //resetear el formulario vuelva recargarlo para volver a seleccionar imagen
    document.getElementById('formUpload').reset();
}

//esta funcion es para cambiar el boton de cargar imagen a subir imagen o cancelar imagen
function onchange(){
    toggleButtons();
}

//para hacer request sin action ni method, sube las imagenes al servidor 
function onsubmit(e){
    //preventDefault cancela el evento que se dispara por defecto para poder modificarlo 
    //en este caso onsubmit busca el action y method pero con preventDefault cancenla esto 
    e.preventDefault();
    //this hace referencia al formulario en si ya que el evento onsubmit es lanzado hacia en el formulario
    var data = new FormData(this);
    //Esta utilizando la libreria superagent para subir a las imagenes
    request
        //es para enviarle data a api/pictures
        .post('/api/pictures')
        //atravez de send enviamos la data
        .send(data)
        //cuando tengamos la respuesta se hara un console.lo
        .end(function (err, res){
            //argments es un array con todos los parametros que recibe 
            console.log(arguments);
        })

}
    return layout(elem);

}
