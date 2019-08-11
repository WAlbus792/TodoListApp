using Gevorgyan.TodoListApp.Application.Commands.Users.Models;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Application.Exceptions;
using Gevorgyan.TodoListApp.Application.Utilities;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Domain.Helpers;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.Application.Commands.Users
{
    /// <summary>
    /// Command that perform authentication of user
    /// </summary>
    public class AuthenticateUserCommand
    {
        #region Constructor

        public AuthenticateUserCommand(
            IRepository<User> userRepository,
            IUserInfoProvider userInfoProvider,
            IAccessRightChecker accessRightChecker
            )
        {
            this.userRepository = userRepository;
            this.userInfoProvider = userInfoProvider;
            this.accessRightChecker = accessRightChecker;
        }

        #endregion Constructor

        #region Fields

        private readonly IRepository<User> userRepository;
        private readonly IUserInfoProvider userInfoProvider;
        private readonly IAccessRightChecker accessRightChecker;

        #endregion Fields

        #region Methods

        /// <summary>
        /// Executes the command
        /// </summary>
        /// <returns>authentication result</returns>
        public async Task<AuthenticateUserResultModel> Execute(AuthenticateUserInputModel model)
        {
            // Check access rights: Anonymous
            accessRightChecker.CheckUserIsAnonymous();

            // pretreatment of model
            model.CheckAndPrepare();

            string passwordHash = HashHelper.GetHashString(model.Password);

            // Checks that user exists
            User user = await userRepository.FirstOrDefaultAsync(iu => iu.Email == model.UserName && iu.PasswordHash == passwordHash);
            if (user is null) throw new BusinessException("User with this login and password does not exist");

            var userRole = user.IsAdmin ? UserRole.Admin : UserRole.User;
            // Adding claims
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, model.UserName), // login
                new Claim(ClaimsIdentity.DefaultRoleClaimType, userRole.ToString()), // role
                new Claim(ClaimTypes.Sid, user.AuthenticationTokenId.ToString())
            };

            // Generating a token
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.Issuer,
                audience: AuthOptions.Audience,
                notBefore: DateTime.UtcNow,
                claims: claims,
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new AuthenticateUserResultModel
            {
                AccessToken = encodedJwt,
                Name = user.Name,
                UserName = model.UserName,
                Role = userRole
            };
        }

        #endregion Methods
    }
}
