import { genSaltSync, hashSync } from 'bcryptjs';

const salt = genSaltSync(+process.env.PASSWORD_SALT_ROUNDS);

export const companySeed = [
  {
    id: 'cb9dee02-c7b1-4d7c-9b2c-253176e04a32',
    nit: '890234323432',
    name: 'ABC SAS',
    address: '63 Glenholme St.',
    email: 'demo@abcsas.com',
    phone: '9876543211',
  },
];

export const userSeed = [
  {
    id: '7ecfd035-1fa2-4a94-a868-a8257d544ade',
    name: 'Admin ABC',
    lastName: 'lastname',
    email: 'admin@gmail.com',
    phone: '9876543212',
    companyId: 'cb9dee02-c7b1-4d7c-9b2c-253176e04a32',
    password: hashSync('emprendeduros', salt),
  },
];
