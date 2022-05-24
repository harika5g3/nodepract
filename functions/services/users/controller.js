const router = require("express").Router()
const Model = require("./model")

router.post("/createUser", (req, res) => {
  const inputs = req.body
  const obj = new Model()
  return obj
    ._create_user(inputs)
    .then(() => {
      return res.status(201).json({ message: `User created successfully` })
    })
    .catch((err) => {
      console.error(err)
      return res.status(500).json({ message: `Failed to create the user` })
    })
})

router.get("/getUser", (req, res) => {
  const { uid } = req.query
  const obj = new Model()
  return obj
    ._get_user(uid)
    .then((data) => {
      return res.status(200).json({ data })
    })
    .catch((err) => {
      console.error(err)
      if (err.code === "auth/invalid-uid")
        return res.status(422).json({ message: `UID cannot be empty string` })
      if (err.code === "auth/user-not-found" || err.toString().match("user-not-exists"))
        return res.status(404).json({ message: `There is no user with existing uid` })
      return res.status(422).json({ message: `Failed to get user` })
    })
})


module.exports = router