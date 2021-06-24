const middlewares = require('../middlewares/userMiddleware');
const userService = require('../services/userService');
const { dataTest } = require('../configTests/dataTest');
const utilities = require('../utilities/listStatusMessages');
const expectedReturns = require('../configTests/expectedReturns');

describe('Testing Middlewares', () => {
  describe('checkNickNameExitsMiddleware', () => {
    it('Return function (next) when service layer returns a messageError', async () => {
      const mockData = {
        statusCode: 404,
        errorMessage: expectedReturns.nicknameExists,
      };
      const mockReq = { body: { nickname: 'Gui' } };
      const mockNext = jest.fn();
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const getOneSpy = jest.spyOn(userService, 'findByNickName').mockResolvedValueOnce(mockData);
      await middlewares.checkNickNameExitsMiddleware(mockReq, mockRes, mockNext);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
      getOneSpy.mockRestore();
    });

    it('Do not return function (next) when service layer returns a user', async () => {
      const mockReq = { body: { nickname: 'Gui' } };
      const mockJson = jest.fn();
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      const getOneSpy = jest.spyOn(userService, 'findByNickName').mockResolvedValueOnce(dataTest[0]);
      await middlewares.checkNickNameExitsMiddleware(mockReq, mockRes, mockNext);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.nicknameExists);
      getOneSpy.mockRestore();
    });
  });

  describe('Testing checkSizeNickNameMiddleware', () => {
    it('Returns (next) function when passing valid nickname', () => {
      const mockReq = { body: { nickname: 'Gui' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkSizeNickNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('Does not return function (next) when passing invalid nickname', () => {
      const mockReq = { body: { nickname: 'oRatoRoeuARoupaDoReiDeRomaECourreu' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkSizeNickNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.nickNameSize);
    });
  });

  describe('Testing checkSizeBioMiddleware', () => {
    it('Returns the (next) function when passing the valid bio field', () => {
      const mockReq = { body: { bio: 'Dev-Back-And' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkSizeBioMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('No Return function (next) when passing invalid bio field', () => {
      let bio = '';
      for (let i = 0; i < 102; i++) {
        bio += 'a';
      }
      const mockReq = { body: { bio } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkSizeBioMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.bioSize);
    });
    it('Returns the function (next) when it does not inform the bio field', () => {
      const mockReq = { body: {} };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkSizeBioMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });
  });

  describe('Testing checkNickNameMiddleware', () => {
    it('Returns (next) function when passing valid nickname', () => {
      const mockReq = { body: { nickname: 'Gui' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkNickNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('No Returns the function (next) when informing the nickname field empty', () => {
      const mockReq = { body: { nickname: '' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkNickNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.nicknameEmpty);
    });

    it('No Returns the function (next) when it does not inform the nickname field', () => {
      const mockReq = { body: {} };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkNickNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.nickNameIsNull);
    });
  });

  describe('Testing checkNameMiddleware', () => {
    it('Returns the (next) function when it informs the valid name field', () => {
      const mockReq = { body: { name: 'Gui' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('Does not return the function (next) when informing the empty name field', () => {
      const mockReq = { body: { name: '' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.nameEmpty);
    });

    it('Does not return the function (next) when it does not inform the name field', () => {
      const mockReq = { body: {} };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.nameIsNull);
    });
  });

  describe('Testing checkLastNameMiddleware', () => {
    it('Returns the (next) function when it informs the valid lastname field', () => {
      const mockReq = { body: { lastname: 'Rua dezoito de maio' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkLastNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('Does not return the function (next) when informing the empty lastname field', () => {
      const mockReq = { body: { lastname: '' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkLastNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.lastnameEmpty);
    });

    it('Does not return the function (next) when it does not inform the lastname field', () => {
      const mockReq = { body: {} };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkLastNameMiddleware(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.lastnameIsNull);
    });
  });

  describe('Testing checkAddressMiddleare', () => {
    it('Returns the (next) function when it informs the valid address field', () => {
      const mockReq = { body: { address: 'Rua dezoito de maio' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkAddressMiddleare(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('Does not return the function (next) when informing the empty address field', () => {
      const mockReq = { body: { address: '' } };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkAddressMiddleare(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.addressEmpty);
    });

    it('Does not return the function (next) when it does not inform the address field', () => {
      const mockReq = { body: {} };
      const mockRes = { status: jest.fn(), json: jest.fn() };
      const mockNext = jest.fn();
      middlewares.checkAddressMiddleare(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expectedReturns.addressIsNull);
    });
  });
});

describe('Testing Utilities Functions', () => {
  describe('Testing fieldNull', () => {
    it('Return expected when passing a string', () => {
      const resultExpected = {
        statusCode: 400,
        errorMessage: {
          error: {
            message: 'field lastname required',
          },
        },
      };
      const result = utilities.fieldNull('lastname');
      expect(result).toStrictEqual(resultExpected);
    });
  });

  describe('Testing fieldInvalid', () => {
    it('Return expected when passing a string', () => {
      const resultExpected = {
        statusCode: 400,
        errorMessage: {
          error: {
            message: 'nickname field cannot be empty',
          },
        },
      };
      const result = utilities.fieldInvalid('nickname');
      expect(result).toStrictEqual(resultExpected);
    });
  });
});
