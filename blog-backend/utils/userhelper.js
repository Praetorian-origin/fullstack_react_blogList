const User = require('../models/user')
const bcrypt = require('bcrypt')

const saltRounds = 10


const passwordRoot = 'erzropgreopgje'
const passwordBlackWhite = 'erzropgreo74854je'
const passwordHashforRoot = bcrypt.hashSync(passwordRoot , saltRounds)
const passwordHashforblackwhite = bcrypt.hashSync(passwordBlackWhite, saltRounds)

const initialUsers = [
  {
    username: 'root',
    name: 'admin',
    password: passwordRoot,
    passwordHash: passwordHashforRoot
  },
  {
    username: 'blackwhite',
    name: 'populous',
    password: 'erzropgreo74854je',
    passwordHash: passwordHashforblackwhite
  }
]

const nonExistingId = async () => {

  const user = new User({
    username: 'truss',
    name: 'papynova',
    password: 'erzro5454pgreopgje'
  })


  await user.save()
  await user.remove()

  return user._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}


const countofUsers = async () => {
  const userCount = await User.count({})
  return userCount
}



module.exports = { initialUsers, nonExistingId, usersInDb, countofUsers }