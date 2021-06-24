const userNotFound = {
  error: {
    message: 'user not found',
  },
};

const nicknameNotExists = {
  error: {
    message: 'nickname does not exist',
  },
};

const internalError = {
  error: {
    message: 'Internal error',
  },
};

const nicknameExists = {
  error: {
    message: 'nickname already exists',
  },
};

const nickNameSize = {
  error: {
    message: 'nickname cannot be longer than 30 characters',
  },
};

const bioSize = {
  error: {
    message: 'bio cannot be longer than 100 characters',
  },
};

const nicknameEmpty = {
  error: {
    message: 'nickname field cannot be empty',
  },
};

const lastnameEmpty = {
  error: {
    message: 'lastname field cannot be empty',
  },
};

const nameEmpty = {
  error: {
    message: 'name field cannot be empty',
  },
};

const addressEmpty = {
  error: {
    message: 'address field cannot be empty',
  },
};

const nickNameIsNull = {
  error: {
    message: 'field nickname required',
  },
};

const lastnameIsNull = {
  error: {
    message: 'field lastname required',
  },
};

const addressIsNull = {
  error: {
    message: 'field address required',
  },
};

const nameIsNull = {
  error: {
    message: 'field name required',
  },
};

module.exports = {
  userNotFound,
  nicknameNotExists,
  internalError,
  nicknameExists,
  nickNameSize,
  bioSize,
  nicknameEmpty,
  nickNameIsNull,
  nameEmpty,
  nameIsNull,
  addressEmpty,
  addressIsNull,
  lastnameEmpty,
  lastnameIsNull,
};
