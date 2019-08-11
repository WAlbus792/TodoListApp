using Gevorgyan.TodoListApp.Domain.Helpers;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.Application.Contracts
{
    /// <summary>
    /// Component for checking access rights of user
    /// </summary>
    public interface IAccessRightChecker
    {
        /// <summary>
        /// Check that current user is System
        /// </summary>
        void CheckUserIsSystem();

        /// <summary>
        /// Check that current user is authenticated
        /// </summary>
        void CheckUserIsAuthenticated();

        /// <summary>
        /// Checks that current user is Anonymous (not authenticated)
        /// </summary>
        void CheckUserIsAnonymous();

        /// <summary>
        /// Check that current user is administrator
        /// </summary>
        Task CheckUserIsAdmin();

        /// <summary>
        /// Check that simple user is current user and that user with the same id of auth token exists
        /// </summary>
        Task CheckUserAuthToken();

        /// <summary>
        /// Check that current user has specified role
        /// </summary>
        bool CheckIsUserInRole(UserRole userRole);
    }
}
