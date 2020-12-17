module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      totpKey: DataTypes.STRING
    },
    { underscored: true, tableName: 'users', timestamps: false, paranoid: false }
  );
  return User;
};
