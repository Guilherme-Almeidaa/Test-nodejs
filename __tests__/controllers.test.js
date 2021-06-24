const userController = require('../controllers/userController');
const userService = require('../services/userService');
const { dataTest, newUser, updatedDataTest } = require('../configTests/dataTest');
const expectedReturns = require('../configTests/expectedReturns');

const returnInernalErrorDescription = 'Return internal error';
const returnErrorMessageDescription = 'Return correct status and message when service layer returns errorMessage';
'Return correct status and message when service layer returns errorMessage';
const returnUserDescription = 'Return the correct status and content when the service layer returns a user';

describe('Testing controllers', () => {
  describe('Testing getAll', () => {
    it('Return all users', async () => {
      const getOneSpy = jest.spyOn(userService, 'getAll').mockResolvedValueOnce(dataTest);
      const mockReq = { body: {} };
      const mockRes = { status: jest.fn(), json: jest.fn() };

      await userController.getAll(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(dataTest);
      getOneSpy.mockRestore();
    });
    it(returnInernalErrorDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'getAll').mockRejectedValueOnce(new Error());
      const mockReq = { body: {} };
      const mockRes = { status: jest.fn(), json: jest.fn() };

      await userController.getAll(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.internalError);
      getOneSpy.mockRestore();
    });
  });

  describe('Testing findById', () => {
    it(returnUserDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'findById').mockResolvedValueOnce(dataTest[0]);
      const mockReq = { params: { id: 1 } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.findById(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(dataTest[0]);
      getOneSpy.mockRestore();
    });
    it(returnErrorMessageDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'findById')
        .mockResolvedValueOnce({ statusCode: 404, errorMessage: expectedReturns.userNotFound });
      const mockReq = { params: { id: 3 } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.findById(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.userNotFound);
      getOneSpy.mockRestore();
    });
    it(returnInernalErrorDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'findById').mockRejectedValueOnce(new Error());
      const mockReq = { params: { id: 1 } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.findById(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.internalError);
      getOneSpy.mockRestore();
    });
  });
  describe('Testing deleteById', () => {
    it('Returns no content when service layer returns true', async () => {
      const getOneSpy = jest.spyOn(userService, 'deleteById').mockResolvedValueOnce(true);
      const mockReq = { params: { id: 1 } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.deleteById(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      getOneSpy.mockRestore();
    });
    it(returnErrorMessageDescription, async () => {
      const mockData = {
        statusCode: 404,
        errorMessage: expectedReturns.userNotFound,
      };
      const getOneSpy = jest.spyOn(userService, 'deleteById').mockResolvedValueOnce(mockData);
      const mockReq = { params: { id: 1 } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.deleteById(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.userNotFound);
      getOneSpy.mockRestore();
    });
    it(returnInernalErrorDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'deleteById').mockRejectedValueOnce(new Error());
      const mockReq = { params: { id: 1 } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.deleteById(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.internalError);
      getOneSpy.mockRestore();
    });
  });

  describe('Testing findByNickName', () => {
    it('Returns correct status and content when services layer returns a user', async () => {
      const mockData = {
        name: dataTest[0].name,
        nickname: dataTest[0].nickname,
        lastname: dataTest[0].lastname,
      };
      const getOneSpy = jest.spyOn(userService, 'findByNickName').mockResolvedValueOnce(mockData);
      const mockReq = { query: 'Scroll' };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.findByNickName(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockData);
      getOneSpy.mockRestore();
    });

    it(returnErrorMessageDescription, async () => {
      const mockData = {
        statusCode: 404,
        errorMessage: expectedReturns.userNotFound,
      };
      const getOneSpy = jest.spyOn(userService, 'findByNickName').mockResolvedValueOnce(mockData);
      const mockReq = { query: 'Guilherme' };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.findByNickName(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.userNotFound);
      getOneSpy.mockRestore();
    });

    it(returnInernalErrorDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'findByNickName').mockRejectedValueOnce(new Error());
      const mockReq = { query: 'Guilherme' };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.findByNickName(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.internalError);
      getOneSpy.mockRestore();
    });
  });

  describe('Testing updateLastNameAndAddress', () => {
    it(returnUserDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'updateLastNameAndAddress').mockResolvedValueOnce(dataTest[0]);
      const mockReq = {
        body: {
          name: dataTest[0].name,
          lastname: dataTest[0].lastname,
        },
        params: { id: 1 },
      };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.updateLastNameAndAddress(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(dataTest[0]);
      getOneSpy.mockRestore();
    });

    it(returnErrorMessageDescription, async () => {
      const mockData = {
        statusCode: 404,
        errorMessage: expectedReturns.userNotFound,
      };
      const getOneSpy = jest.spyOn(userService, 'updateLastNameAndAddress').mockResolvedValueOnce(mockData);
      const mockReq = {
        body: {
          name: dataTest[0].name,
          lastname: dataTest[0].lastname,
        },
        params: { id: 1 },
      };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.updateLastNameAndAddress(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.userNotFound);
      getOneSpy.mockRestore();
    });

    it(returnInernalErrorDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'updateLastNameAndAddress').mockRejectedValueOnce(new Error());
      const mockReq = {
        body: {
          name: dataTest[0].name,
          lastname: dataTest[0].lastname,
        },
        params: { id: 1 },
      };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.updateLastNameAndAddress(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.internalError);
      getOneSpy.mockRestore();
    });
  });
  describe('Testing findByNameOrLastName', () => {
    it(returnUserDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'findByNameOrLastName').mockResolvedValueOnce([...dataTest]);
      const mockReq = { query: 'Guilherme' };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.findByNameOrLastName(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([...dataTest]);
      getOneSpy.mockRestore();
    });

    it(returnErrorMessageDescription, async () => {
      const mockData = {
        statusCode: 404,
        errorMessage: expectedReturns.userNotFound,
      };
      const getOneSpy = jest.spyOn(userService, 'findByNameOrLastName').mockResolvedValueOnce(mockData);
      const mockReq = { query: 'Guilherme' };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.findByNameOrLastName(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.userNotFound);
      getOneSpy.mockRestore();
    });

    it(returnInernalErrorDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'findByNameOrLastName').mockRejectedValueOnce(new Error());
      const mockReq = { query: 'Guilherme' };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.findByNameOrLastName(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.internalError);
      getOneSpy.mockRestore();
    });
  });
  describe('Testing createUser', () => {
    it(returnUserDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'createUser').mockResolvedValueOnce(newUser);
      const mockReq = {
        body: newUser,
      };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.createUser(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(newUser);
      getOneSpy.mockRestore();
    });

    it(returnInernalErrorDescription, async () => {
      const getOneSpy = jest.spyOn(userService, 'createUser').mockRejectedValueOnce(new Error());
      const mockReq = {
        body: newUser,
      };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      await userController.createUser(mockReq, mockRes);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.internalError);
      getOneSpy.mockRestore();
    });
  });
});
