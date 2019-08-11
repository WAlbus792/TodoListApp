using System;
using System.Threading.Tasks;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Application.Utilities;
using Microsoft.EntityFrameworkCore;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Application.Commands.Users.Management.Models;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Gevorgyan.TodoListApp.Application.Exceptions;

namespace Gevorgyan.TodoListApp.Application.Commands.Users.Management
{
    /// <summary>
    /// Command for creating user
    /// </summary>
    public class CreateUserCommand
    {
        #region Constructor

        public CreateUserCommand(
            IRepository<User> userRepository,
            IAccessRightChecker accessRightChecker,
            IDbChangesUpdater changesSaver
            )
        {
            this.userRepository = userRepository;
            this.accessRightChecker = accessRightChecker;
            this.changesSaver = changesSaver;
        }

        #endregion Constructor

        #region Fields

        private readonly IRepository<User> userRepository;
        private readonly IAccessRightChecker accessRightChecker;
        private readonly IDbChangesUpdater changesSaver;

        #endregion Fields

        #region Methods

        /// <summary>
        /// Executes the command
        /// </summary>
        /// <returns>created user</returns>
        public async Task<User> Execute(CreateUserInputModel model)
        {
            // Check access rights: Admin
            await accessRightChecker.CheckUserIsAdmin();

            // pretreatment of model
            model.CheckAndPrepare();

            // specific validation

            if(model.Password != model.PasswordConfirmation) throw new BusinessException("Password and confirmation password do not match");
            if(model.Password.Length < 6) throw new BusinessException("Length of password must be at least 6 symbols");

            model.Email = model.Email.ToLower(); // making lowercase
            if(!EmailValidationUtility.CheckIsValidEmail(model.Email)) throw new BusinessException("Email specified not correctly");

            if(await userRepository.AnyAsync(a => a.Email == model.Email)) throw new BusinessException("User with specified email already exists");

            // creating object
            User user = new User
            {
                Name = model.Name,
                Email = model.Email,
                PasswordHash = HashHelper.GetHashString(model.Password),
                AuthenticationTokenId = Guid.NewGuid()
            };
            await userRepository.AddAsync(user);

            // saving made changes
            await changesSaver.SaveChangesAsync();

            return user;
        }

        #endregion Methods
    }
}