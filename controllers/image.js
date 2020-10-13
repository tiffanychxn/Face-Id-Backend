const { json } = require('body-parser');
const Clarifai = require('clarifai');

// You need to add your own API key here from Clarifai.
const app = new Clarifai.App({
    //apiKey: "b3aef77b71f6459194e7c52bb7abd863",
    apiKey: "5cd48bf71a4d4153b230e2e4847722eb",
  });

const handleApiCall = (req,res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data=>{
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))

}


const handleImage = (req,res,db) => {
    
    const {id} = req.body;
    db('users').where('id','=', id)
    .increment('entries' ,1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
         
}

module.exports ={
    handleImage,
    handleApiCall
};