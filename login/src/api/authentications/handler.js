const pool = require('../../db');
const bcrypt = require('bcrypt');

class AuthenticationsHandler {
  constructor(tokenManager) {
    this._tokenManager = tokenManager;

    this.postAuthenticationsHandler = this.postAuthenticationsHandler.bind(this);
  }

  async postAuthenticationsHandler(request, h) {
    const { email, password } = request.payload;

    // VERIFY EMAIL Validate Credentials
    console.log(email, password);

    const accessToken = this._tokenManager.generateAccessToken({
      usersId: 1004,
      roleId: 'ADMIN'
    });
    const refreshToken = this._tokenManager.generateRefreshToken({
      usersId: 1004,
      roleId: 'ADMIN'
    });

    const response = h.response({
      accessToken,
      refreshToken,
    });
    response.code(201);
    return response;
  }

  async postUsersHandler(request, h) {
    const { usersId, roleId } = request.auth.credentials;
    const payload = request.payload;
    return { usersId, roleId, payload };
  }
}

module.exports = AuthenticationsHandler;
