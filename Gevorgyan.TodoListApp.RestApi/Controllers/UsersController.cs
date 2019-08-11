using Gevorgyan.TodoListApp.Application.Commands.Users.Management;
using Gevorgyan.TodoListApp.Application.Commands.Users.Management.Models;
using Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management;
using Gevorgyan.TodoListApp.Application.Queries.Users.Management;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.RestApi.Controllers
{
    /// <summary>
    /// Interaction with users
    /// </summary>
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        #region Fields

        private readonly GetUsersQuery getUsersQuery;
        private readonly GetUserTodoListsQuery getUserTodoListsQuery;
        private readonly CreateUserCommand createUserCommand;
        private readonly UpdateUserCommand updateUserCommand;
        private readonly RemoveUserCommand removeUserCommand;

        #endregion Fields

        #region Constructor

        public UsersController(
            GetUsersQuery getUsersQuery,
            GetUserTodoListsQuery getUserTodoListsQuery,
            CreateUserCommand createUserCommand,
            UpdateUserCommand updateUserCommand,
            RemoveUserCommand removeUserCommand
            )
        {
            this.getUsersQuery = getUsersQuery;
            this.getUserTodoListsQuery = getUserTodoListsQuery;
            this.createUserCommand = createUserCommand;
            this.updateUserCommand = updateUserCommand;
            this.removeUserCommand = removeUserCommand;
        }

        #endregion Constructor

        #region Methods

        /// <summary>
        /// Returns all users considering filtration, sorting, pagination
        /// </summary>
        [HttpGet]
        [Authorize]
        public async Task<DataSourceResult> GetUsers([DataSourceRequest] DataSourceRequest request) => await getUsersQuery.BuildForGrid(request);

        /// <summary>
        /// Creates a user
        /// </summary>
        [HttpPost]
        [Authorize]
        public async Task Create([FromBody] CreateUserInputModel model) => await createUserCommand.Execute(model);

        /// <summary>
        /// Updates the user
        /// </summary>
        [HttpPut("{id}")]
        [Authorize]
        public async Task Update(int id, [FromBody] UpdateUserInputModel model) => await updateUserCommand.Execute(id, model);

        /// <summary>
        /// Removes the user
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task Remove(int id) => await removeUserCommand.Execute(id);

        /// <summary>
        /// Returns all todo-lists belonging to the user considering filtration, sorting, pagination
        /// </summary>
        [HttpGet("todo-lists")]
        [Authorize]
        public async Task<DataSourceResult> GetUserTodoLists([DataSourceRequest] DataSourceRequest request) => await getUserTodoListsQuery.BuildForGrid(request);

        #endregion Methods
    }
}
