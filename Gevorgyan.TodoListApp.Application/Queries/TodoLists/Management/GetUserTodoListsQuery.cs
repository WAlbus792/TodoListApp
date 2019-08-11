using AutoMapper.QueryableExtensions;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management.Models;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management
{
    /// <summary>
    /// Query for returning all todo-lists for the current user
    /// </summary>
    public class GetUserTodoListsQuery
    {
        #region Constructor

        public GetUserTodoListsQuery(
            IAccessRightChecker accessRightChecker,
            IRepository<TodoList> todoListRepository,
            IUserInfoProvider userInfoProvider
            )
        {
            this.accessRightChecker = accessRightChecker;
            this.todoListRepository = todoListRepository;
            this.userInfoProvider = userInfoProvider;
        }

        #endregion Constructor

        #region Fields

        private readonly IAccessRightChecker accessRightChecker;
        private readonly IRepository<TodoList> todoListRepository;
        private readonly IUserInfoProvider userInfoProvider;

        #endregion Fields

        #region Methods

        /// <summary>
        /// Get grid data for UI
        /// </summary>
        public async Task<DataSourceResult> BuildForGrid(DataSourceRequest request)
        {
            // Check access rights: User
            await accessRightChecker.CheckUserAuthToken();

            return await todoListRepository
                .Where(e => e.User.Email == userInfoProvider.UserName)
                .ProjectTo<TodoListViewModel>()
                .ToDataSourceResultAsync(request);
        }

        #endregion Methods
    }
}
