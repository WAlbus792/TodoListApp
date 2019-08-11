using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Application.Exceptions;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Domain.Helpers;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.Application
{
    /// <summary>
    /// Component for checking access rights of user
    /// </summary>
    public class AccessRightChecker : IAccessRightChecker
    {
        #region Consts

        protected const string AccessDeniedErrorMessage = "Access denied for the operation";

        #endregion Consts

        #region Constructor

        public AccessRightChecker(
            IUserInfoProvider userInfoProvider,
            IRepository<User> userRepository
            )
        {
            this.userInfoProvider = userInfoProvider;
            this.userRepository = userRepository;
        }

        #endregion Constructor

        #region Fields

        private readonly IUserInfoProvider userInfoProvider;
        private readonly IRepository<User> userRepository;

        #endregion Fields

        #region Public methods

        #region IAccessRightChecker

        /// <summary>
        /// Checks that current user is System
        /// </summary>
        public void CheckUserIsSystem()
        {
            if (userInfoProvider.UserType != UserType.System)
                throw new BusinessException(AccessDeniedErrorMessage);
        }

        /// <summary>
        /// Checks that current user is authenticated
        /// </summary>
        public void CheckUserIsAuthenticated()
        {
            if (userInfoProvider.UserType != UserType.Authenticated)
                throw new BusinessException(AccessDeniedErrorMessage);
        }

        /// <summary>
        /// Checks that current user is Anonymous (not authenticated)
        /// </summary>
        public void CheckUserIsAnonymous()
        {
            if (userInfoProvider.UserType != UserType.Anonymous)
                throw new BusinessException(AccessDeniedErrorMessage);
        }

        /// <summary>
        /// Checks that current user is administrator
        /// </summary>
        public async Task CheckUserIsAdmin()
        {
            CheckAccessRight(UserRole.Admin);
            await CheckAdminExists();
        }

        /// <summary>
        /// Check that simple user is current user and that user with the same id of auth token exists
        /// </summary>
        public async Task CheckUserAuthToken()
        {
            CheckUserIsAuthenticated();
            if (!await userRepository.AnyAsync(e => e.AuthenticationTokenId == userInfoProvider.UserTokenId))
                throw new AccessDeniedException(AccessDeniedErrorMessage);
        }

        /// <summary>
        /// Checks that current user is authenticated and has correct role
        /// </summary>
        public bool CheckIsUserInRole(UserRole userRole) => userInfoProvider.UserType == UserType.Authenticated && userInfoProvider.UserRole == userRole;

        #endregion

        #endregion

        #region Private methods

        /// <summary>
        /// Checks current user access rights using role
        /// </summary>
        /// <param name="userRole">Role of user</param>
        private void CheckAccessRight(UserRole userRole)
        {
            if (!CheckIsUserInRole(userRole))
                throw new AccessDeniedException(AccessDeniedErrorMessage);
        }

        /// <summary>
        /// Check that admin user with the same id of auth token exists
        /// </summary>
        private async Task CheckAdminExists()
        {
            if(!await userRepository.AnyAsync(e => e.IsAdmin && e.AuthenticationTokenId == userInfoProvider.UserTokenId))
                throw new AccessDeniedException(AccessDeniedErrorMessage);
        }

        #endregion
    }
}
