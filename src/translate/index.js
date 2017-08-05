//windows es el objeto global lo utilizamos para que el hace un mmomento hace 3 segundos 
//la soporte el navegador safary ya que en la documentacion de intl el navegador safary no lo soporta
//con inteRelativeFormat 
if(!window.Intl) {
    window.Intl = require('intl');
    require('intl/locale-data/jsonp/en-US.js');
    require('intl/locale-data/jsonp/es.js');
}
//con intlRelativeFormat es para el formato de la fecha se en ingles o en español
var IntlRelativeFormat = window.IntlRelativeFormat = require('intl-relativeformat');
//requerimos estas libreria la cual ya esta instalada para el formato de la fecha en la tarjeta
require('intl-relativeformat/dist/locale-data/en.js');
require('intl-relativeformat/dist/locale-data/es.js');

//con IntlMessageFormat es para el texto sea en ingles o en español
var IntlMessageFormat = require('intl-messageformat');


var es = require('./es');
var en = require('./en-US');

//creamos un objeto 
var MESSAGES = {};
//a el objeto messages le estamos definiendo dos propiedades 
//para las propiedades con guion medio o espacios se utilizan corchetes en vez de punto
MESSAGES.es = es;
MESSAGES['en-US'] = en;

//esta es la region o el idioma
//localStore van a almacenar valores que van a permanecer en el tiempo por mas
//que cerremos la pagina son como las cookies 
//estamos diciendo que locale es igual a localstorage.locale pero como primeramente no tiene valor va ha ser null 
//y si es null entonces por defecto va a ser es osea español
var locale = localStorage.locale || 'es';


module.exports = {
    //message sera una propiedad para traducir los mensajes text es el mensaje o texto option es
    //la cantidad de likes     
    message: function (text, opts = {}){
        //creamos un IntlMessagFormat para poder traducir cada uno de los textos MESSAGE es el objeto que nos trae lo exportado
        //locale es la region text es el parametro 
        var msg = new IntlMessageFormat(MESSAGES[locale][text],locale,null);
        //opts son la cantida de likes
        return msg.format(opts);   
    },    
    
    date: new IntlRelativeFormat(locale)
}
