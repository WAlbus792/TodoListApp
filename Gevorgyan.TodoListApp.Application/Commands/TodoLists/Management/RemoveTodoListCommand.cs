using System.Threading.Tasks;
using Gevorgyan.TodoListApp.Domain;
using Microsoft.EntityFrameworkCore;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Gevorgyan.TodoListApp.Application.Exceptions;
using System.Linq;

namespace Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management
{
    /// <summary>
    /// Command for deleting todo-list of current user
    /// </summary>
    public class RemoveTodoListCommand
    {
        #region Constructor

        public RemoveTodoListCommand(
            IRepository<User> userRepository,
            IRepository<TodoList> todoListRepository,
            IAccessRightChecker accessRightChecker,
            IDbChangesUpdater changesSaver,
            IUserInfoProvider userInfoProvider
            )
        {
            this.userRepository = userRepository;
            this.todoListRepository = todoListRepository;
            this.accessRightChecker = accessRightChecker;
            this.changesSaver = changesSaver;
            this.userInfoProvider = userInfoProvider;
        }

        #endregion Constructor

        #region Fields

        private readonly IRepository<User> userRepository;
        private readonly IRepository<TodoList> todoListRepository;
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

            // gets the todo-list to remove
            TodoList removingTodoList = await todoListRepository.GetById(id).FirstOrDefaultAsync();
            if (removingTodoList is null) throw new BusinessException("Removing todo-list does not exist");
            if(!currentUser.IsAdmin && removingTodoList.UserId != currentUser.Id) throw new BusinessException("User cannot delete a todo-list not belonging him");

            // removes the todo-list
            await todoListRepository.RemoveAsync(removingTodoList.Id);

            // saves made changes
            await changesSaver.SaveChangesAsync();
        }

        #endregion Methods
    }
}