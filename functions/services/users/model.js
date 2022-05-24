const { db, admin } = require("../../utils/admin")
const {firestore}=require("firebase-admin")
const UTILS = require("./utils")

class Model {
  constructor(user) {
    this.actionPerformer = user
    this.serverTimestamp = admin.firestore.FieldValue.serverTimestamp()
  }

  async _create_user(inputs) {
    let userInfo = {}
    return admin
      .auth()
      .createUser({
        email: inputs.email,
        password: inputs.password,
      })
      .then((user) => {
        userInfo = user
        return admin.auth().setCustomUserClaims(user.uid, { role: "user" })
      })
      .then(() => {
        const userRef = db.collection("USERS").doc(userInfo.uid)
        const inputData = {}
        Object.entries(inputs).forEach(([key, value]) => {
          if (key !== "password") inputData[key] = value
        })
        return userRef.set({
          ...inputData,
          isExist: true,
          createdAt: this.serverTimestamp,
          role: "user",
          id: userRef.id,
          uid: userInfo.uid,
        })
      })
      .catch((err) => {
        throw err
      })
  }

  

  async _get_user(uid) {
    let userInfo = {}
    return UTILS._check_user_exists(uid)
      .then((data) => {
        userInfo = { ...userInfo, ...data }
        return userInfo
      })
      .catch((err) => {
        throw err
      })
  }

  
  
}

module.exports = Model