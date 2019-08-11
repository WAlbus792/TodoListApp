using Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management.Items;
using Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management.Items.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.RestApi.Controllers
{
    /// <summary>
    /// Interaction with todo-list items
    /// </summary>
    [Route("api/[controller]")]
    public class TodoListItemsController : Controller
    {
        #region Constructor

        public TodoListItemsController(
            CreateTodoListItemCommand createTodoListItemCommand,
            UpdateTodoListItemCommand updateTodoListItemCommand,
            RemoveTodoListItemCommand removeTodoListItemCommand
            )
        {
            this.createTodoListItemCommand = createTodoListItemCommand;
            this.updateTodoListItemCommand = updateTodoListItemCommand;
            this.removeTodoListItemCommand = removeTodoListItemCommand;
        }

        #endregion Constructor

        #region Fields

        private readonly CreateTodoListItemCommand createTodoListItemCommand;
        private readonly UpdateTodoListItemCommand updateTodoListItemCommand;
        private readonly RemoveTodoListItemCommand removeTodoListItemCommand;

        #endregion Fields

        #region Methods 

        /// <summary>
        /// Creates a todo-list item
        /// </summary>
        [HttpPost]
        [Authorize]
        public async Task Create([FromBody] TodoListItemInputModel model) => await createTodoListItemCommand.Execute(model);

        /// <summary>
        /// Updates the todo-list item
        /// </summary>
        [HttpPut("{id}")]
        [Authorize]
        public async Task Update(int id, [FromBody] TodoListItemInputModel model) => await updateTodoListItemCommand.Execute(id, model);

        /// <summary>
        /// Removes the todo-list item
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task Remove(int id) => await removeTodoListItemCommand.Execute(id);

        #endregion Methods
    }
}
