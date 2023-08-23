const Role = require('../model/auth/roles');
const connectDB = require('../utility/connectDB');
require('dotenv').config();

const allRoles = [];

const superAdmin = new Role({
  name: 'superAdmin',
  permissions: [
    'ReadQustion',
    'ReadQuestionPaper',
    'CreateQuestionPaper',
    'UpdateQuestionPaper',
    'DeleteQuestionPaper',
  ],
});

const questionCreator = new Role({
  name: 'questionCreator',
  permissions: [
    'ReadQustion',
    'ReadQuestionPaper',
    'CreateQuestionPaper',
    'UpdateQuestionPaper',
    'DeleteQuestionPaper',
  ],
});

const questionApprover = new Role({
  name: 'questionApprover',
  permissions: ['ReadQustion', 'UpdateQuestion'],
});

allRoles.push(superAdmin);
allRoles.push(questionCreator);
allRoles.push(questionApprover);

connectDB(process.env.MONGODB_URI);

allRoles.forEach((role) => {
  const results = Role.create(role);
  console.log(results);
});
