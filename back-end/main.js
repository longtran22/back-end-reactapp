const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/main');
const path = require('path');
const app = express();
const mongodb = require('./modules/config/db'); // Kết nối DB chính
const connectOtherDB = require('./modules/config/dbcourse'); // Kết nối DB khác
const bodyParser = require('body-parser');
const port =3000;
const methodOverride=require('method-override')
const { engine } = require('express-handlebars')

// Connect to databases
mongodb(); // Kết nối cơ sở dữ liệu chính
const dbcourse = connectOtherDB(); // Gọi kết nối thứ hai

app.use(express.urlencoded({
    extended: true
  }));

app.use(methodOverride('_method'))
app.engine('hbs', engine({
    extname: '.hbs',
    helpers :{
      sum: (a,b) => a+b
    }
 }))
 app.set('view engine','hbs')
 app.set('views', path.join(__dirname, 'resources/views'))

 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
routes(app);

// app.listen(5000, () => {
//     console.log('Server đang chạy tại http://localhost:5000');
// });

app.listen(port, () => {
  console.log(`App listening on port  http://localhost:${port}`)
})