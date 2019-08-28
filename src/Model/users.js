import bcrypt from 'bcrypt-nodejs';

const users = [
  {
    id: 1,
    firstName: 'ruhimbaza',
    lastName: 'Bertin',
    email: 'ruhimbazab@gmail.com',
    password: bcrypt.hashSync('rrr122'),
    address: 'kigali',
    bio: 'scientist',
    occupation: 'software development',
    expertise: 'sostware architecture',
    userType: 'user',
  },
  {
    id: 2,
    firstName: 'ahishakiye',
    lastName: 'aline',
    email: 'aline@gmail.com',
    password: bcrypt.hashSync('ahi123'),
    address: 'Nairobi',
    bio: 'researcher',
    occupation: 'advocacy',
    expertise: 'teaching',
    userType: 'mentor',
  },
  {
    id: 3,
    firstName: 'ngarambe',
    lastName: 'antoine',
    email: 'kagorora1@gmail.com',
    password: bcrypt.hashSync('ngarambe'),
    address: 'legos',
    bio: 'something',
    occupation: 'maintenance',
    expertise: 'maintainning systems',
    userType: 'admin',
  },
  {
    id: 4,
    firstName: 'kalisa',
    lastName: 'claude',
    email: 'claude@gmail.com',
    password: bcrypt.hashSync('claude123'),
    address: 'Nairobi',
    bio: 'researcher',
    occupation: 'advocacy',
    expertise: 'teaching',
    userType: 'mentor',
  },
];

export default users;
