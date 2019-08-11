using AutoMapper.QueryableExtensions;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management.Models;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management
{
    /// <summary>
    /// Query for returning all todo-lists
    /// </summary>
    public class GetTodoListsQuery
    {
        #region Constructor

        public GetTodoListsQuery(
            IAccessRightChecker accessRightChecker,
            IRepository<TodoList> todoListRepository
            )
        {
            this.accessRightChecker = accessRightChecker;
            this.todoListRepository = todoListRepository;
        }

        #endregion Constructor

        #region Fields

        private readonly IAccessRightChecker accessRightChecker;
        private readonly IRepository<TodoList> todoListRepository;

        #endregion Fields

        #region Methods

        /// <summary>
        /// Get grid data for UI
        /// </summary>
        public async Task<DataSourceResult> BuildForGrid(DataSourceRequest request)
        {
            // Check access rights: Admin
            await accessRightChecker.CheckUserIsAdmin();

            return await todoListRepository.ProjectTo<TodoListViewModel>().ToDataSourceResultAsync(request);
        }

        #endregion Methods
    }
}
