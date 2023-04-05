const express = require('express');
const cors = require("cors");
var path = require('path');
var createError = require('http-errors');
const app = express();
const sql = require("./db.js");

const apiRouter = require("./routes/apiRouter.js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints
app.get('/', (req, res) => {
  res.json({ message: "ok" });
});

app.use("/api", apiRouter);

// set port, listen for requests
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
