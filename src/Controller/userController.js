import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
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
    const hashedPsw = bcrypt.hashSync(password);
    const newUser = userValidation.validate({
      // eslint-disable-next-line max-len
      token: jstoken, id: idNo, firstName, lastName, email, password: hashedPsw, address, bio, occupation, expertise, userType,
    });
    if (!newUser.error) {
      users.push(newUser.value);
      return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        token: jstoken,
        data: {
          // eslint-disable-next-line max-len
          id: idNo, firstName, lastName, email, password: hashedPsw, address, bio, occupation, expertise, userType,
        },
      });
    }
    const validationError = newUser.error.details[0].message.replace('"', ' ').replace('"', '');
    return res.status(400).json({
      status: 400,
      error: validationError,
    });
  }

  static signin(req, res) {
    const {
      email, password,
    } = req.body;
    const checkUser = users.find(u => u.email === email);
    if (!checkUser) {
      return res.status(404).json({
        status: 404,
        error: 'user not found',
      });
    }
    // eslint-disable-next-line max-len
    const jstoken = jwt.sign({ id: checkUser.id, email: checkUser.email, userType: checkUser.userType }, process.env.SECRET_KEY);
    const comparePassword = bcrypt.compareSync(password, checkUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        status: 401,
        error: 'Password do not match',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'User is successfully signed in',
      token: jstoken,
      data: {
        id: checkUser.id, email: checkUser.email,
      },
    });
  }

  static viewAllMentors(req, res) {
    if (req.user.userType === 'user' || req.user.userType === 'admin') {
      const mentors = users.filter(user => user.userType === 'mentor');
      return res.status(200).json({
        status: 200,
        data: {
          mentors,
        },
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'unauthorized route',
    });
  }

  static specificMentor(req, res) {
    if (req.user.userType === 'user' || req.user.userType === 'admin') {
      const { mentorId } = req.params;
      const mentors = users.filter(user => user.userType === 'mentor');
      // eslint-disable-next-line radix
      const foundMentor = mentors.find(mentor => mentor.id === parseInt(mentorId));
      if (foundMentor) {
        return res.status(200).json({
          status: 200,
          data: foundMentor,
        });
      }
      return res.status(400).json({
        status: 400,
        error: 'mentor not found',
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Admin and user have access',
    });
  }
}

export default userController;
