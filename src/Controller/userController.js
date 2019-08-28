import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../Model/users';
import userValidation from '../helper/validation';

dotenv.config();
class userController {
  static signup(req, res) {
    const {
      firstName, lastName, email, password, address, bio, occupation, expertise, userType,
    } = req.body;
    const checkUser = users.find(u => u.email === email);
    if (checkUser) {
      return res.status(401).json({
        status: 401,
        error: 'Email already exist',
      });
    }
    const idNo = users.length + 1;
    const jstoken = jwt.sign({ id: idNo, email, userType }, process.env.SECRET_KEY);
    const newUser = userValidation.validate({
      // eslint-disable-next-line max-len
      token: jstoken, id: idNo, firstName, lastName, email, password, address, bio, occupation, expertise, userType,
    });
    if (!newUser.error) {
      users.push(newUser.value);
      return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        data: {
          // eslint-disable-next-line max-len
          token: jstoken, id: idNo, firstName, lastName, email, password, address, bio, occupation, expertise, userType,
        },
      });
    }
    const validationError = newUser.error.details[0].message.replace('"', ' ').replace('"', '');
    return res.status(400).json({
      status: 400,
      error: validationError,
    });
  }
}

export default userController;
