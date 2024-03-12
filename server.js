const express = require("express");
const mongoose = require("mongoose");
const shortUrl =require('./models/shortUrl')
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))


mongoose.connect('mongodb+srv://abhijith:Abhijith2001@cluster0.ypyxvlu.mongodb.net/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.get("/", async (req, res) => {
   const shortUrls= await shortUrl.find()
  res.render("index",{shortUrls: shortUrls} );

});

app.post("/shortUrls", async(req, res) => {
    await shortUrl.create({full: req.body.fullUrl})

    res.redirect('/')
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })

app.listen(5000, () => {
  console.log("server running!");
});
