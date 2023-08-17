const roles = {
    superAdmin: ['organization', 'user', 'question', 'questionPaper'],
    questionCreator: ['question', 'user'],
    // Define other roles and their permissions
};


function authorize(role) {
    return function(req, res, next) {
        const userRole = req.user.role; // Assuming you have user info stored in the request

        if (roles[userRole] && roles[userRole].includes(permission)) {
            next(); // User has the required permission
        } else {
            res.status(403).json({ error: 'Permission denied' });
        }
    };
}
