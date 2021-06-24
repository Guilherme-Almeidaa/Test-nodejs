const userController = require('../controllers/userController');
const userService = require('../services/userService');
const { dataTest, newUser, updatedDataTest } = require('./config/dataTest');
const expectedReturns = require('./config/expectedReturns');
const { User } = require('../models');

describe('Testing controllers', () => {
    beforeEach(async () => {
        await User.destroy({ where: {}, truncate: true });
        await User.bulkCreate(dataTest);
    });
    describe('Testing getAll', () => {
        it('Return all users', async () => {
            const getOneSpy = jest.spyOn(userService, 'getAll').mockResolvedValueOnce(dataTest);
            const mockReq = { body: {} }
            const mockRes = { status: jest.fn(), json: jest.fn() };

            await userController.getAll(mockReq, mockRes);
            expect(getOneSpy).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(dataTest);
            getOneSpy.mockRestore();
        })
        it('return internal error', async () => {
            const getOneSpy = jest.spyOn(userService, 'getAll').mockRejectedValueOnce(new Error());
            const mockReq = { body: {} }
            const mockRes = { status: jest.fn(), json: jest.fn() };

            await userController.getAll(mockReq, mockRes);
            expect(getOneSpy).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            getOneSpy.mockRestore();
        })
    })

    describe('Testing findById', () => {
        it('return the correct user by id', async () => {
            const mockReq = { params: { id: 1 } };
            const mockRes = { status: jest.fn(), json: jest.fn() };
            const getOneSpy = jest.spyOn(userService, 'findById').mockResolvedValueOnce(dataTest[0]);
            await userController.findById(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(dataTest[0]);

        })
    })
})

