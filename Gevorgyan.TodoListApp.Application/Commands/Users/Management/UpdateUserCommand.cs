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
    /// Command for updating user
    /// </summary>
    public class UpdateUserCommand
    {
        #region Constructor

        public UpdateUserCommand(
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
        /// <returns>updated user</returns>
        public async Task<User> Execute(int id, UpdateUserInputModel model)
        {
            // Check access rights: Admin
            await accessRightChecker.CheckUserIsAdmin();

            // pretreatment of model
            model.CheckAndPrepare();

            // specific validation

            model.Email = model.Email.ToLower(); // making lowercase
            if (!EmailValidationUtility.CheckIsValidEmail(model.Email)) throw new BusinessException("Email specified not correctly");

            if (await userRepository.AnyAsync(a => a.Id != id && a.Email == model.Email)) throw new BusinessException("User with specified email already exists");

            // gets the user
            User user = await userRepository.GetById(id).FirstOrDefaultAsync();
            if(user is null) throw new BusinessException("User does not exist");

            // updates the user
            user.Email = model.Email;
            user.Name = model.Name;
            user.AuthenticationTokenId = Guid.NewGuid(); // generating new token id

            // saves made changes
            await changesSaver.SaveChangesAsync();

            return user;
        }

        #endregion Methods
    }
}