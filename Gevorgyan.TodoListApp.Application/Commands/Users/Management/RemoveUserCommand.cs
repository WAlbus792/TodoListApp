using System;
using System.Threading.Tasks;
using Gevorgyan.TodoListApp.Domain;
using Microsoft.EntityFrameworkCore;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Gevorgyan.TodoListApp.Application.Exceptions;

namespace Gevorgyan.TodoListApp.Application.Commands.Users.Management
{
    /// <summary>
    /// Command for deleting user
    /// </summary>
    public class RemoveUserCommand
    {
        #region Constructor

        public RemoveUserCommand(
            IRepository<User> userRepository,
            IAccessRightChecker accessRightChecker,
            IDbChangesUpdater changesSaver,
            IUserInfoProvider userInfoProvider
            )
        {
            this.userRepository = userRepository;
            this.accessRightChecker = accessRightChecker;
            this.changesSaver = changesSaver;
            this.userInfoProvider = userInfoProvider;
        }

        #endregion Constructor

        #region Fields

        private readonly IRepository<User> userRepository;
        private readonly IAccessRightChecker accessRightChecker;
        private readonly IDbChangesUpdater changesSaver;
        private readonly IUserInfoProvider userInfoProvider;

        #endregion Fields

        #region Methods

        /// <summary>
        /// Executes the command
        /// </summary>
        public async Task Execute(int userId)
        {
            // Check access rights: Admin
            await accessRightChecker.CheckUserIsAdmin();

            // gets the user to remove
            User removingUser = await userRepository.GetById(userId).FirstOrDefaultAsync();
            if (removingUser is null) throw new BusinessException("Removing user does not exist");
            if(removingUser.Email == userInfoProvider.UserName) throw new BusinessException("Impossible to delete yourself");

            // removes the user
            await userRepository.RemoveAsync(userId);

            // saves made changes
            await changesSaver.SaveChangesAsync();
        }

        #endregion Methods
    }
}