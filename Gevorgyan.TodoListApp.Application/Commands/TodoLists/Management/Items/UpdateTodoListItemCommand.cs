using System.Threading.Tasks;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Application.Utilities;
using Microsoft.EntityFrameworkCore;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management.Items.Models;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Gevorgyan.TodoListApp.Application.Exceptions;
using System.Linq;

namespace Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management.Items
{
    /// <summary>
    /// Command for updating the todo-list item of the current user
    /// </summary>
    public class UpdateTodoListItemCommand
    {
        #region Constructor

        public UpdateTodoListItemCommand(
            IRepository<TodoListItem> todoListItemRepository,
            IRepository<User> userRepository,
            IAccessRightChecker accessRightChecker,
            IDbChangesUpdater changesSaver,
            IUserInfoProvider userInfoProvider
            )
        {
            this.todoListItemRepository = todoListItemRepository;
            this.userRepository = userRepository;
            this.accessRightChecker = accessRightChecker;
            this.changesSaver = changesSaver;
            this.userInfoProvider = userInfoProvider;
        }

        #endregion Constructor

        #region Fields

        private readonly IRepository<User> userRepository;
        private readonly IRepository<TodoListItem> todoListItemRepository;
        private readonly IAccessRightChecker accessRightChecker;
        private readonly IDbChangesUpdater changesSaver;
        private readonly IUserInfoProvider userInfoProvider;

        #endregion Fields

        #region Methods

        /// <summary>
        /// Executes the command
        /// </summary>
        /// <returns>updated todo-list item</returns>
        public async Task<TodoListItem> Execute(int id, TodoListItemInputModel model)
        {
            // Check access rights: User
            await accessRightChecker.CheckUserAuthToken();

            // pretreatment of model
            model.CheckAndPrepare();

            // specific validation
            if (!typeof(TodoListItemState).IsEnumDefined(model.State)) throw new BusinessException("State of todo-list item specified not correctly");

            // gets the current user
            User currentUser = await userRepository.Where(e => e.Email == userInfoProvider.UserName).AsNoTracking().FirstOrDefaultAsync();
            if (currentUser is null) throw new BusinessException("User does not exist");

            // gets the todo-list item
            TodoListItem todoListItem = await todoListItemRepository.GetById(id).Include(e => e.TodoList.User).FirstOrDefaultAsync();
            if(todoListItem is null) throw new BusinessException("Todo-list item does not exist");
            if (!currentUser.IsAdmin && todoListItem.TodoList.UserId != currentUser.Id) throw new BusinessException("User cannot change a todo-list item not belonging to his todo-list");

            // updates the todo-list
            todoListItem.Title = model.Title;
            todoListItem.State = model.State;

            // saves made changes
            await changesSaver.SaveChangesAsync();

            return todoListItem;
        }

        #endregion Methods
    }

}