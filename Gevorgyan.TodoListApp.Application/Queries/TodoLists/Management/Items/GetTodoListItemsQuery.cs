using AutoMapper.QueryableExtensions;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management.Items.Models;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Domain.Helpers;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management.Items
{
    /// <summary>
    /// Query for returning all todo-list items by id of the current user todo-list
    /// </summary>
    public class GetTodoListItemsQuery
    {
        #region Constructor

        public GetTodoListItemsQuery(
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
        public async Task<DataSourceResult> BuildForGrid(int todoListId, DataSourceRequest request)
        {
            // Check access rights: User
            await accessRightChecker.CheckUserAuthToken();

            return await todoListRepository
                .Where(e => e.Id == todoListId && (userInfoProvider.UserRole == UserRole.Admin || e.User.Email == userInfoProvider.UserName))
                .SelectMany(e => e.Items)
                .ProjectTo<TodoListItemViewModel>()
                .ToDataSourceResultAsync(request);
        }

        #endregion Methods
    }
}
