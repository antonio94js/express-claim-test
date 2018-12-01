const users = [
  {
    id: 1,
    name: 'Antonio Mejias',
    password: '123456',
    rol: 'admin',
    email: 'antonio@gmail.com',
  },
  {
    id: 2,
    name: 'Raelyx Cordero',
    password: '456789',
    rol: 'user',
    email: 'raelyx@gmail.com',
  },
];

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', users, {}),

  down: (queryInterface) => {
    const usersIds = users.map(user => user.id);
    return queryInterface.bulkDelete('Users', [{
      id: usersIds,
    }]);
  },
};
