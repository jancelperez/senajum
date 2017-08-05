var express =  require('express');

//multer lo utilizamos para subir las imagenes al servidor cuando le damos el boton de cargar imagenes
var multer  = require('multer');

var ext = require('file-extension');

//storage son distintas formas de almacenar la informacion en este caso es diskStorage
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    //uploads es la carpeta donde van a quedar la imagenes
    cb(null, './uploads')
  },

  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
  
})

var upload = multer({ storage: storage }).single('picture');


var app = express();

//motor de plantilla que se utiliza en este caso pug 
app.set('view engine','pug');

//la carpeta public va a estar accesible para servir archivos estaticos
//cuando en el archivo Gulpfile le indicamos que lo que hacemos lo envie a public este nos ayuda para automatizar
app.use(express.static('public'));

//acceder a la ruta si / es la principal o home 
app.get('/',function(req, res){
    // llamar al motor de vista de pug primer parametro
    //nos devuelve el index.pug
    res.render('index', {title:'Senagram - Home'});
})

//acceder a la ruta signup
app.get('/signup',function(req, res){
    //llamar al motor de vista de pug primer parametro
    //nos debuelve el index.pug
    res.render('index', {title:'Senagram - Signup'});
})

//acceder a la ruta signup
app.get('/signin',function(req, res){
    //llamar al motor de vista de pug primer parametro
    //nos devulve el index.pug
    res.render('index', {title:'Senagram - Signin'});
})

//simulamos que estan imagenes son las que estan cargadas en la base de datos
app.get('/api/pictures' , function(req, res){
    //picures es un array de objetos los array los definimos con [] y dentro de los
    //llaves van los objetos los objetos los definimos {nombre} y dentro de los objetos podemos definir otos objetos
    //ejmplo array de objetos pictures[{},{},{}]; 
    var pictures = [
        {
            user: {
            username: 'phoemix',
            avatar:'https://lh3.googleusercontent.com/-3O0uMgYVCnY/VxBtb9OpaCI/AAAAAAAAAE4/PBQGu7lE4bUQkWdEF7u_OpH_G8CAaESgACEw/w140-h140-p/cerro.jpg'
            },
            url: 'office.jpg',
            likes:0,
            liked:false,
            createdAt: new Date().getTime()
        },
        {
            user: {
            username: 'phoemix',
            avatar:'https://lh3.googleusercontent.com/-3O0uMgYVCnY/VxBtb9OpaCI/AAAAAAAAAE4/PBQGu7lE4bUQkWdEF7u_OpH_G8CAaESgACEw/w140-h140-p/cerro.jpg'
            },
            url: 'office.jpg',
            likes:1,
            liked:true,
            createdAt: new Date().setDate(new Date().getDate()-10)
        }
    ];
    //despues que pase 2000 milisegundo que es lo mismo que 2 segundos tiempo haga el calback o la funcion anonima
    setTimeout(function sendPictures(){
        //recuperar el array pictures que es un array tipo json
        res.send(pictures);
    },2000)
});

app.post('/api/pictures', function (req, res){
    upload(req, res, function(err){
        if (err){
            return res.send(500,"Error uploadin file");
        }
        res.send("File uploaded");
    });
})

app.get('/api/user/:username',function (req, res){
    const user = {
        username: 'Phoemix',
        avatar: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.0-9/11745961_10203840990859947_7336104751874142726_n.jpg?oh=33f73a0c348eb8a07f64bb3838710de5&oe=59D652E0',
        pictures: [
            {
                id: 1,
                src: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.0-9/12002796_10204153280066982_4798700094864093658_n.jpg?oh=0302d1b6ae70d9cb66d1115d944c5c06&oe=59E2C0EF',
                likes: 278
            },
            {
                id: 2,
                src: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t31.0-8/12594018_10204746509777354_3891472485324319608_o.jpg?oh=426db16d7301f09214dd7fb718e00707&oe=59DA8A84',
                likes: 80
            },
            {
                id: 3,
                src: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.0-9/11986545_10204151516382891_9068016761457118814_n.jpg?oh=bc893e883ea3f8d6c5e44176e21e6cba&oe=59CD2040',
                likes: 999
            },
            {
                id: 4,
                src: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.0-9/313723_1840234220354_61742_n.jpg?oh=d4926c8e8d5a0f881fb40e63a9f3c167&oe=59D536FC',
                likes: 74
            },
            {
                id: 5,
                src: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.0-9/11899875_10204024154798931_2672130648907136516_n.jpg?oh=70fa11eb0acb375a574836d482fb37c5&oe=59D60C73',
                likes: 133
            },
            {
               id: 6,
               src: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.0-9/17103277_10207374129866214_344355652933280995_n.jpg?oh=7dbc519cc75741e1c25246f8fd64defc&oe=59DEF9EA',
               likes: 43
            }
        ]
    }

    res.send(user)
})

app.get('/:username',function(req, res){
    res.render('index', {title:`Senagram - ${req.params.username}`});
})

app.get('/:username/:id',function(req, res){
    res.render('index', {title:`Senagram - ${req.params.username}`});
})
//lanzar nuestro servidor web
// 3000 es el puerto y la function nos imprime en consola si hay error 
// process.exti que haga un exit 
app.listen(3000,function(err){
    if(err) return console.log("Hubo un erro"), process.exit(1);
    
    console.log('escuchando en el puerto 3000');
})
