const express = require('express'); 
const multer = require('multer');
const path = require('path');
const serveIndex = require('serve-index');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage });

const app = express();

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
