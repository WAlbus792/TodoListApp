using Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management;
using Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management.Models;
using Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management;
using Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management.Items;
using Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management.Models;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.RestApi.Controllers
{
    /// <summary>
    /// Interaction with todo-lists
    /// </summary>
    [Route("api/[controller]")]
    public class TodoListsController : Controller
    {
        #region Constructor

        public TodoListsController(
            GetTodoListsQuery getTodoListsQuery,
            GetTodoListByIdQuery getTodoListByIdQuery,
            GetTodoListItemsQuery getTodoListItemsQuery,
            CreateTodoListCommand createTodoListCommand,
            UpdateTodoListCommand updateTodoListCommand,
            RemoveTodoListCommand removeTodoListCommand
            )
        {
            this.getTodoListsQuery = getTodoListsQuery;
            this.getTodoListByIdQuery = getTodoListByIdQuery;
            this.getTodoListItemsQuery = getTodoListItemsQuery;
            this.createTodoListCommand = createTodoListCommand;
            this.updateTodoListCommand = updateTodoListCommand;
            this.removeTodoListCommand = removeTodoListCommand;
        }

        #endregion Constructor

        #region Fields

        private readonly GetTodoListsQuery getTodoListsQuery;
        private readonly GetTodoListByIdQuery getTodoListByIdQuery;
        private readonly GetTodoListItemsQuery getTodoListItemsQuery;
        private readonly CreateTodoListCommand createTodoListCommand;
        private readonly UpdateTodoListCommand updateTodoListCommand;
        private readonly RemoveTodoListCommand removeTodoListCommand;

        #endregion Fields

        #region Methods 

        /// <summary>
        /// Returns all todo-lists of all users considering filtration, sorting, pagination
        /// </summary>
        [HttpGet]
        [Authorize]
        public async Task<DataSourceResult> GetTodoLists([DataSourceRequest] DataSourceRequest request) => await getTodoListsQuery.BuildForGrid(request);

        /// <summary>
        /// Returns todo-list by id if it belongs to the current user
        /// </summary>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<TodoListViewModel> GetTodoList(int id) => await getTodoListByIdQuery.Build(id);

        /// <summary>
        /// Creates a todo-list
        /// </summary>
        [HttpPost]
        [Authorize]
        public async Task Create([FromBody] TodoListInputModel model) => await createTodoListCommand.Execute(model);

        /// <summary>
        /// Updates the todo-list
        /// </summary>
        [HttpPut("{id}")]
        [Authorize]
        public async Task Update(int id, [FromBody] TodoListInputModel model) => await updateTodoListCommand.Execute(id, model);

        /// <summary>
        /// Removes the todo-list
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task Remove(int id) => await removeTodoListCommand.Execute(id);

        /// <summary>
        /// Returns all items of the todo-list considering only pagination
        /// </summary>
        [HttpGet("{todoListId}/items")]
        [Authorize]
        public async Task<DataSourceResult> GetTodoListItems(int todoListId, [DataSourceRequest] DataSourceRequest request) => 
            await getTodoListItemsQuery.BuildForGrid(todoListId, request);

        #endregion Methods
    }
}
