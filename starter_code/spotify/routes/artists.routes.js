const express = require('express')
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node')


const clientId = process.env.CLIENTID,
    clientSecret = process.env.CLIENTSECRET;

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })


router.get('/',(req,res)=>{

  console.log(req.query.artist, "busqueda")
  spotifyApi.searchArtists(req.query.artist)
    .then(data => {
      console.log("The received data from the API: ", data.body.artists.items);
     res.render('artists', {data: data.body.artists.items})
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })

})

module.exports = router;