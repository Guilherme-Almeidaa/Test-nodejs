const userController = require('../controllers/userController');
const userService = require('../services/userService');
const shell = require('shelljs');
describe('Testing controllers', () => {
   
    describe('Testing getAll', () => {
        beforeAll(async () => {
            shell.exec('npx sequelize-cli db:drop');
            shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
            shell.exec('npx sequelize-cli db:seed:all $');
          });
        it('return all users', async () => {
           
            const getOneSpy = jest.spyOn(userService, 'getAll').mockResolvedValueOnce(mockData);
            const mockReq = { body: {} }
            const mockRes = { status: jest.fn(), json: jest.fn() };

            await userController.getAll(mockReq, mockRes);
            expect(getOneSpy).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockData);
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

            await userController.findById(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockData[0]);

        })
    })
})