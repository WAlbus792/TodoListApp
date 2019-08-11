using System.Threading.Tasks;
using Gevorgyan.TodoListApp.Domain;
using Microsoft.EntityFrameworkCore;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Gevorgyan.TodoListApp.Application.Exceptions;
using System.Linq;

namespace Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management.Items
{
    /// <summary>
    /// Command for deleting todo-list item from current user todo-list
    /// </summary>
    public class RemoveTodoListItemCommand
    {
        #region Constructor

        public RemoveTodoListItemCommand(
            IRepository<User> userRepository,
            IRepository<TodoListItem> todoListItemRepository,
            IAccessRightChecker accessRightChecker,
            IDbChangesUpdater changesSaver,
            IUserInfoProvider userInfoProvider
            )
        {
            this.userRepository = userRepository;
            this.todoListItemRepository = todoListItemRepository;
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
        public async Task Execute(int id)
        {
            // Check access rights: User
            await accessRightChecker.CheckUserAuthToken();

            // gets the current user
            User currentUser = await userRepository.Where(e => e.Email == userInfoProvider.UserName).AsNoTracking().FirstOrDefaultAsync();
            if (currentUser is null) throw new BusinessException("User does not exist");

            // gets the todo-list item to remove
            TodoListItem removingTodoListItem = await todoListItemRepository.GetById(id).Include(e => e.TodoList.User).FirstOrDefaultAsync();
            if (removingTodoListItem is null) throw new BusinessException("Removing todo-list item does not exist");
            if(!currentUser.IsAdmin && removingTodoListItem.TodoList.UserId != currentUser.Id) throw new BusinessException("User cannot delete the todo-list item not belonging to his todo-list");

            // removes the todo-list item
            await todoListItemRepository.RemoveAsync(removingTodoListItem.Id);

            // saves made changes
            await changesSaver.SaveChangesAsync();
        }

        #endregion Methods
    }
}