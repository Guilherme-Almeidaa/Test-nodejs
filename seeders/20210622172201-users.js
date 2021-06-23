module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Guilherme',
        lastname: 'Almeida',
        nickname: 'Scroll',
        address: 'Rua dezoito de maio',
        bio: 'Dev Full-Stack',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        name: 'Jośe',
        lastname: 'Almeida',
        nickname: 'Zezé',
        address: 'Rua dezoito de maio',
        bio: 'Dev Full-Stack',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
