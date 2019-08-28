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

  static changeUserType(req, res) {
    if (req.user.userType === 'admin') {
      const { userId } = req.params;
      // eslint-disable-next-line radix
      const foundUser = users.find(usr => usr.id === parseInt(userId));
      if (foundUser && foundUser.userType === 'user') {
        const updatedUser = {
          id: foundUser.id, firstName: foundUser.firstName, lastName: foundUser.lastName, email: foundUser.email, password: foundUser.password, address: foundUser.address, bio: foundUser.bio, occupation: foundUser.occupation, expertise: foundUser.expertise, userType: 'mentor',
        };
        users[users.indexOf(foundUser)] = updatedUser;
        return res.status(200).json({
          status: 200,
          message: 'User account changed to mentor',
          data: updatedUser,
        });
      }
      return res.status(400).json(({
        status: 400,
        error: 'user is already a mentor or admin',
      }));
    }
    return res.status(401).json({
      status: 401,
      error: 'Forbirden route',
    });
  }
}

// eslint-disable-next-line eol-last
export default adminController;