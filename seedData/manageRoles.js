import Role, { create } from '../model/auth/roles';
import connectDB from '../utility/connectDB';
require('dotenv').config();

const allRoles = [];

const superAdmin = new Role({
  name: 'superAdmin',
  permissions: [
    'Admin',
    'RoleEditor'
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
  permissions: ['ReadQustion','UpdateQuestion'],
});

allRoles.push(superAdmin);
allRoles.push(questionCreator);
allRoles.push(questionApprover);

await connectDB(process.env.MONGODB_URI);

allRoles.forEach((role) => {
  const results = create(role);
  console.log(results);
});
