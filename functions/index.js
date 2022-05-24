const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//  const app =  require("express")();
//  const {admin} =  require("./utils/admin")

//  app.post("/createuser",(req,res) =>{
//      const inputs = req.body;
//      return admin.auth().createUser({
//          email: inputs.email,
//          password : inputs.password
//      })
//  })
//  exports.api = functions.https.onRequest(app);

const app = require("express")()

app.use("/auth", require("./services/users/controller"))

exports.api = functions.https.onRequest(app)