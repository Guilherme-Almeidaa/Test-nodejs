const shell = require('shelljs');
const userService = require('../services/userService');
const { dataTest, newUser, updatedDataTest } = require('../configTests/dataTest');
const expectedReturns = require('../configTests/expectedReturns');
const { User } = require('../models');

describe('Testing services', () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
    await User.bulkCreate(dataTest);
  });

  beforeAll(async () => {
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
  });

  describe('Testing getAll', () => {
    it('Return all users', async () => {
      const users = await userService.getAll();
      expect(users).toBeTruthy();
      users.forEach((user, index) => {
        expect(user.id).toEqual(index + 1);
        expect(user.name).toEqual(dataTest[index].name);
        expect(user.nickname).toEqual(dataTest[index].nickname);
        expect(user.lastname).toEqual(dataTest[index].lastname);
        expect(user.address).toEqual(dataTest[index].address);
        expect(user.bio).toEqual(dataTest[index].bio);
        expect(user.createdAt).toBeTruthy();
        expect(user.updatedAt).toBeTruthy();
      });
    });
  });

  describe('Testing findById', () => {
    it('Return the correct user by id 1', async () => {
      const user = await userService.findById(1);
      expect(user).toBeTruthy();
      expect(user.id).toEqual(1);
      expect(user.name).toEqual(dataTest[0].name);
      expect(user.nickname).toEqual(dataTest[0].nickname);
      expect(user.lastname).toEqual(dataTest[0].lastname);
      expect(user.address).toEqual(dataTest[0].address);
      expect(user.bio).toEqual(dataTest[0].bio);
      expect(user.createdAt).toBeTruthy();
      expect(user.updatedAt).toBeTruthy();
    });

    it('Return the correct user by id 2', async () => {
      const user = await userService.findById(2);
      expect(user).toBeTruthy();
      expect(user.id).toEqual(2);
      expect(user.name).toEqual(dataTest[1].name);
      expect(user.nickname).toEqual(dataTest[1].nickname);
      expect(user.lastname).toEqual(dataTest[1].lastname);
      expect(user.address).toEqual(dataTest[1].address);
      expect(user.bio).toEqual(dataTest[1].bio);
      expect(user.createdAt).toBeTruthy();
      expect(user.updatedAt).toBeTruthy();
    });
    it('Returns the correct error message to with an id that does not exist', async () => {
      const user = await userService.findById(3);
      expect(user.statusCode).toBeTruthy();
      expect(user.errorMessage).toBeTruthy();
      expect(user.statusCode).toEqual(404);
      expect(user.errorMessage).toStrictEqual(expectedReturns.userNotFound);
    });
  });

  describe('Testing deleteById', () => {
    it('Delete the correct user by passing id 1', async () => {
      const user = await userService.deleteById(1);
      const users = await User.findAll();
      expect(user).toBeTruthy();
      expect(users[0].id).toStrictEqual(2);
      expect(users[1]).toBeUndefined();
      expect(users.length).toBe(1);
    });

    it('Delete the correct user by passing id 2', async () => {
      const user = await userService.deleteById(2);
      const users = await User.findAll();
      expect(user).toBeTruthy();
      expect(users[0].id).toStrictEqual(1);
      expect(users[1]).toBeUndefined();
      expect(users.length).toBe(1);
    });
    it('Returns the correct message when deleted with an id that does not exist', async () => {
      const user = await userService.deleteById(3);
      const users = await User.findAll();
      expect(user).toBeTruthy();
      expect(users.length).toBe(2);
      expect(user.statusCode).toBeTruthy();
      expect(user.errorMessage).toBeTruthy();
      expect(user.statusCode).toEqual(404);
      expect(user.errorMessage).toStrictEqual(expectedReturns.userNotFound);
    });
  });

  describe('Testing findByNickName', () => {
    it('Return the correct user by nickname Scroll', async () => {
      const user = await userService.findByNickName('Scroll');
      expect(user).toBeTruthy();
      expect(user.name).toEqual(dataTest[0].name);
      expect(user.nickname).toEqual(dataTest[0].nickname);
      expect(user.lastname).toEqual(dataTest[0].lastname);
    });

    it('Return the correct user by nickname Zezé', async () => {
      const user = await userService.findByNickName('Zezé');
      expect(user).toBeTruthy();
      expect(user.name).toEqual(dataTest[1].name);
      expect(user.nickname).toEqual(dataTest[1].nickname);
      expect(user.lastname).toEqual(dataTest[1].lastname);
    });

    it('returns the correct message with a nickname that does not exist', async () => {
      const user = await userService.findByNickName('Guilherme');
      expect(user.statusCode).toBeTruthy();
      expect(user.errorMessage).toBeTruthy();
      expect(user.statusCode).toEqual(404);
      expect(user.errorMessage).toStrictEqual(expectedReturns.nicknameNotExists);
    });
  });

  describe('Testing updateNickName', () => {
    it('Updates and return with expected nickname', async () => {
      const user = await userService.updateNickName('Gui', 1);
      const users = await User.findAll();
      expect(users[0].nickname).toBe('Gui');
      expect(user).toBeTruthy();
      expect(user.id).toEqual(1);
      expect(user.name).toEqual(dataTest[0].name);
      expect(user.nickname).toEqual('Gui');
      expect(user.lastname).toEqual(dataTest[0].lastname);
      expect(user.address).toEqual(dataTest[0].address);
      expect(user.bio).toEqual(dataTest[0].bio);
      expect(user.createdAt).toBeTruthy();
      expect(user.updatedAt).toBeTruthy();
    });

    it('Return the correct message when you try to upgrade with Id that there is no', async () => {
      const user = await userService.updateNickName('Gui', 3);
      const users = await User.findAll();
      expect(users[0].nickname).toBe('Scroll');
      expect(user).toBeTruthy();
      expect(user.statusCode).toBeTruthy();
      expect(user.errorMessage).toBeTruthy();
      expect(user.statusCode).toEqual(404);
      expect(user.errorMessage).toStrictEqual(expectedReturns.userNotFound);
    });
  });

  describe('Testing updateLastNameAndAddress', () => {
    it('Updates and returns with the expected last name and address', async () => {
      const user = await userService.updateLastNameAndAddress('Allan', 'Rua 23 de março', 1);
      const users = await User.findAll();
      expect(users[0].address).toBe('Rua 23 de março');
      expect(users[0].lastname).toBe('Allan');
      expect(user).toBeTruthy();
      expect(user.id).toEqual(1);
      expect(user.name).toEqual(dataTest[0].name);
      expect(user.nickname).toEqual(dataTest[0].nickname);
      expect(user.lastname).toEqual('Allan');
      expect(user.address).toEqual('Rua 23 de março');
      expect(user.bio).toEqual(dataTest[0].bio);
      expect(user.createdAt).toBeTruthy();
      expect(user.updatedAt).toBeTruthy();
    });
    it('Return correct message if trying to update with a non-existent id', async () => {
      const user = await userService.updateLastNameAndAddress('Allan', 'Rua 23 de março', 3);
      const users = await User.findAll();
      expect(users[0].address).toBe('Rua dezoito de maio');
      expect(users[0].lastname).toBe('Almeida');
      expect(user).toBeTruthy();
      expect(user.statusCode).toBeTruthy();
      expect(user.errorMessage).toBeTruthy();
      expect(user.statusCode).toEqual(404);
      expect(user.errorMessage).toStrictEqual(expectedReturns.userNotFound);
    });
  });

  describe('Testing findByNameOrLastName', () => {
    it('Returns the correct user when passing a name or over the name of multiple users', async () => {
      const users = await userService.findByNameOrLastName('Almeida');
      expect(users).toBeTruthy();
      users.forEach((user, index) => {
        expect(user.id).toEqual(index + 1);
        expect(user.name).toEqual(dataTest[index].name);
        expect(user.nickname).toEqual(dataTest[index].nickname);
        expect(user.lastname).toEqual(dataTest[index].lastname);
        expect(user.address).toEqual(dataTest[index].address);
        expect(user.bio).toEqual(dataTest[index].bio);
        expect(user.createdAt).toBeTruthy();
        expect(user.updatedAt).toBeTruthy();
      });
    });

    it('Returns the correct user when passing a first or last name of only one user', async () => {
      const users = await userService.findByNameOrLastName('Guilherme');
      const user = users[0];
      expect(user).toBeTruthy();
      expect(user.id).toEqual(1);
      expect(user.name).toEqual(dataTest[0].name);
      expect(user.nickname).toEqual(dataTest[0].nickname);
      expect(user.lastname).toEqual(dataTest[0].lastname);
      expect(user.address).toEqual(dataTest[0].address);
      expect(user.bio).toEqual(dataTest[0].bio);
      expect(user.createdAt).toBeTruthy();
      expect(user.updatedAt).toBeTruthy();
    });

    it('Returns the correct message when a first or last name that does not exist is given', async () => {
      const user = await userService.findByNameOrLastName('Allan');
      expect(user).toBeTruthy();
      expect(user.statusCode).toBeTruthy();
      expect(user.errorMessage).toBeTruthy();
      expect(user.statusCode).toEqual(404);
      expect(user.errorMessage).toStrictEqual(expectedReturns.userNotFound);
    });
  });

  describe('Testing createUser', () => {
    it('Add and return the correct user', async () => {
      const user = await userService.createUser(newUser);
      const users = await User.findAll();
      users.forEach((userData, index) => {
        expect(userData.id).toEqual(index + 1);
        expect(userData.name).toEqual(updatedDataTest[index].name);
        expect(userData.nickname).toEqual(updatedDataTest[index].nickname);
        expect(userData.lastname).toEqual(updatedDataTest[index].lastname);
        expect(userData.address).toEqual(updatedDataTest[index].address);
        expect(userData.bio).toEqual(updatedDataTest[index].bio);
        expect(userData.createdAt).toBeTruthy();
        expect(userData.updatedAt).toBeTruthy();
      });
      expect(user).toBeTruthy();
      expect(user.id).toEqual(3);
      expect(user.name).toEqual(newUser.name);
      expect(user.nickname).toEqual(newUser.nickname);
      expect(user.lastname).toEqual(newUser.lastname);
      expect(user.address).toEqual(newUser.address);
      expect(user.bio).toEqual(newUser.bio);
      expect(user.createdAt).toBeTruthy();
      expect(user.updatedAt).toBeTruthy();
    });
  });
});
