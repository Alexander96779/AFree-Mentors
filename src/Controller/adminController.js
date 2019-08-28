import users from '../Model/users';

class adminController {
  static allUsers(req, res) {
    if (req.user.userType === 'admin') {
      return res.status(200).json({
        status: 200,
        data: users,
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized route',
    });
  }
}

// eslint-disable-next-line eol-last
export default adminController;