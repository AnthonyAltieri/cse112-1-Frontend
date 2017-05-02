/**
 * @author Anthony Altieri on 5/1/17.
 */

var path = require('path');
var express = require('express');
var app = express();
var PORT = 80;

app.use('/static', express.static(path.join(__dirname, 'dist')));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

app.listen(PORT, function () {
  console.log('application listening at port ' + PORT);
});
