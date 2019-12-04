// imports...
const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

// Server Declaration...
const server = express();

// Middleware...
server.use(express.json());
server.use(logger);
server.use(helmet());

// Custom Middleware...
function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  res.send("All good");
  next();
}

// gatekeeper middleware reads expects a password from headers & pw is' mellon'...
// if pw valid will continue if not send a 401 msg.
function gateKeeper(req, res, next) {
  if (req.originalUrl === "mellon") {
    res.status(200).json({ msg: "Path is correct you may enter" });
  } else {
    res.status(401).json({ error: "Invalid Path" });
  }
  next();
}

// EndPoints...

// server.use("/api/hubs", helmet(), hubsRouter); // hubsRouter is local middleware,
server.use("/api/hubs", helmet(), hubsRouter);
//can implement helmet here also locally.

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get("/loggerTest", (req, res) => {
  res.send(req.headers);
});

server.get("/area51", helmet(), gateKeeper(), (req, res) => {
  res.send(req.headers);
});

// Export
module.exports = server;

// Helmet is good for security

// server.get("/", helmet() (req, res) => { <<< example of middleware used locally.
//   const nameInsert = req.name ? ` ${req.name}` : "";

//   res.send(`
//     <h2>Lambda Hubs API</h2>
//     <p>Welcome${nameInsert} to the Lambda Hubs API</p>
//     `);
// });

// Server module layout

// Imports
// Server Declaration
// Global Middleware (implements on all endpoints)
// EndPoints (with implement and local middleware)
// Ending Middleware (implements after endpoint runs)

// Shift + alt + up/down arrow to copy lines.

//req.properties
