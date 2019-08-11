using AutoMapper.QueryableExtensions;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Application.Queries.Users.Management.Models;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.Application.Queries.Users.Management
{
    /// <summary>
    /// Query for returning all users of system but the admin user
    /// </summary>
    public class GetUsersQuery
    {
        #region Constructor

        public GetUsersQuery(
            IAccessRightChecker accessRightChecker,
            IRepository<User> userRepository
            )
        {
            this.accessRightChecker = accessRightChecker;
            this.userRepository = userRepository;
        }

        #endregion Constructor

        #region Fields

        private readonly IAccessRightChecker accessRightChecker;
        private readonly IRepository<User> userRepository;

        #endregion Fields

        #region Methods

        /// <summary>
        /// Get grid data for UI
        /// </summary>
        public async Task<DataSourceResult> BuildForGrid(DataSourceRequest request)
        {
            // Check access rights: Admin
            await accessRightChecker.CheckUserIsAdmin();

            return await userRepository.Where(e => !e.IsAdmin).ProjectTo<UserViewModel>().ToDataSourceResultAsync(request);
        }

        #endregion Methods
    }
}
