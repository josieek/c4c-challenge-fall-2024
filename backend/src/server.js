import express from 'express';

const app = express();
const port = 4000;

// Some partner data
const partners = {
  "sftt": {
    "thumbnailUrl": "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
    "name": "Speak For The Trees",
    "description": "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
  }
}

/* 
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json())
// Enable CORS for the frontend so it can call the backend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next();
})

/*
  APPLICATION ROUTES
*/

// receives new partner information from the frontend

app.post('/add-partner', (req, res) => {
  const parcel = req.body;
  const {name, thumbnailUrl, description, isActive} = parcel;
  if (!parcel) {
    return res.status(400).send({status: 'failed'});
  }
    partners[name] = { // Add the parcel data to the partners object
      thumbnailUrl: thumbnailUrl,
      name: name,
      description: description,
      isActive: isActive
    };
    res.status(200).send({status: 'received', name: name});

  
});


app.post('/del-partner', (req, res) => {
  const parcel = req.body;
  const {name, thumbnailUrl, description, isActive, action} = parcel;
  if (!parcel) {
    return res.status(400).send({status: 'failed'});
  } 
  if (partners[name]) {
    delete partners[name];
    res.status(200).send({ status: 'received', name: name, action: 'deleted' });
  } else {
    res.status(404).send({ status: 'failed', message: 'Partner not found' });
  }
});

app.get('/', (req, res) => {
  res.status(200).send(partners);
})

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})