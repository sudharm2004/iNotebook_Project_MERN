const connectToMongo=require('./dbConnect');
const express = require('express')
const app = express()
const port = 5000;
const cors=require('cors');

//Function imported from dbConnect.js to connect with database
connectToMongo();

//dealing the with CORS Policy errors
app.use(cors());
app.options('*', cors()); 

//Using express.json() in order to parse the request into object and be able to access request body
app.use(express.json())


//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

//handling request on intial page
app.get('/', (req, res) => {
  res.send('Hello Sudharm!')
})

//listening the app on port 5000
app.listen(port, () => {
  console.log(`iNoteBook App listening on port ${port}`)
})