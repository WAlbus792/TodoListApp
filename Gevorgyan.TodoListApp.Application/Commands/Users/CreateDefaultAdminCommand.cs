using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Gevorgyan.TodoListApp.Application.Utilities;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Gevorgyan.TodoListApp.Application.Contracts;
using System;

namespace Gevorgyan.TodoListApp.Application.Commands.Users
{
    /// <summary>
    /// Command for creating administrator by default
    /// </summary>
    public class CreateDefaultAdminCommand 
    {
        #region Constructor

        public CreateDefaultAdminCommand(
            IRepository<User> userRepository, 
            IUserInfoProvider userInfoProvider,
            IDbChangesUpdater changesUpdater,
            IAccessRightChecker accessRightChecker
            )
        {
            this.userRepository = userRepository;
            this.accessRightChecker = accessRightChecker;
            this.userInfoProvider = userInfoProvider;
            this.changesUpdater = changesUpdater;
        }

        #endregion Constructor

        #region Fields

        private readonly IRepository<User> userRepository;
        private readonly IAccessRightChecker accessRightChecker;
        private readonly IUserInfoProvider userInfoProvider;
        private readonly IDbChangesUpdater changesUpdater;

        #endregion Fields

        #region Methods

        /// <summary>
        /// Executes the command
        /// </summary>
        public async Task Execute()
        {
            // Check access rights: System
            accessRightChecker.CheckUserIsSystem();

            if (!await userRepository.AnyAsync(u => u.IsAdmin)) // is there not any admin user?
            {
                // creating a default admin
                User defaultAdmin = new User
                {
                    PasswordHash = HashHelper.GetHashString("admin"),
                    Email = $"admin@devlix.de",
                    Name = "admin",
                    IsAdmin = true,
                    AuthenticationTokenId = Guid.NewGuid()
                };
                
                userRepository.Add(defaultAdmin);

                // saving made changes
                await changesUpdater.SaveChangesAsync();
            }
        }

        #endregion Methods
    }
}
