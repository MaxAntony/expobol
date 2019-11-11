//un middleware es un programa que hace de intermediarios entre el cliente y el servidor para preprocesar datos

//Express.js es un framework para Node.js que sirve para ayudarnos a crear aplicaciones web en menos tiempo ya que nos proporciona funcionalidades como el  enrutamiento, opciones para gestionar sesiones y cookies, y un largo etc…
const express = require('express');
//es un middleware que nos permite subir imagenes
const multer = require('multer');
//módulo proporciona muchas funciones muy útiles para acceder e interactuar con el sistema de archivos.
const path = require('path');
//Sirve páginas que contienen listados de directorio para una ruta determinada.
const serveIndex = require('serve-index');

//declaramos la constante storage y usamos el metodo diskStorage que devuelve un objeto tipo storageEngine(este objeto es almacenado en la con)
const storage = multer.diskStorage({
  //aqui configuramos la direccion donde vamos a guardar las imagenes
  destination: (req, file, cb) => {
    //aqui indicamos donde se va a guardar
    cb(null, './public/uploads');
  },
  //aqui indicamos con que nombre se va aguardar
  filename: (req, file, cb) => {
    cb(
      null,
      //aqui formamos el nombre del archivo(el nombre que viene de pug, la fecha en formato maquina, la extension del archivo)
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

//le pasamos a multer las configuraciones que hicimos arriba y lo guardamos en "upload"
const upload = multer({ storage: storage });

//aqui iniciamos express
const app = express();

//este es un middleware, sirve para entender las peticiones entrantes
app.use(express.urlencoded({ extended: false }));

app.use(
  '/listar',
  express.static('public/uploads'),
  serveIndex('public/uploads', { icons: true })
);

app.set('view engine', 'pug');

app.get('/subir', function(req, res) {
  res.render('subir');
});

app.post('/upload', upload.single('file'), function(req, res) {
  console.log(
    'ubicacion de amacenamiento es: ',
    req.hostname + '/' + req.file.path
  );
  res.redirect('/listar');
});

app.listen(3000, function() {
  console.log('inicializando el sevidor web.');
});
