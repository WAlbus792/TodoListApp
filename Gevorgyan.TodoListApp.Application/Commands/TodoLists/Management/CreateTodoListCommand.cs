using System.Threading.Tasks;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Application.Utilities;
using Microsoft.EntityFrameworkCore;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management.Models;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Gevorgyan.TodoListApp.Application.Exceptions;
using System.Linq;

namespace Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management
{
    /// <summary>
    /// Command for creating todo-list for current user
    /// </summary>
    public class CreateTodoListCommand
    {
        #region Constructor

        public CreateTodoListCommand(
            IRepository<TodoList> todoListRepository,
            IRepository<User> userRepository,
            IAccessRightChecker accessRightChecker,
            IDbChangesUpdater changesSaver,
            IUserInfoProvider userInfoProvider
            )
        {
            this.todoListRepository = todoListRepository;
            this.userRepository = userRepository;
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
        /// <returns>created todo-list</returns>
        public async Task<TodoList> Execute(TodoListInputModel model)
        {
            // Check access rights: User
            await accessRightChecker.CheckUserAuthToken();

            // pretreatment of model
            model.CheckAndPrepare();

            // gets the current user
            User currentUser = await userRepository.Where(e => e.Email == userInfoProvider.UserName).AsNoTracking().FirstOrDefaultAsync();
            if (currentUser is null) throw new BusinessException("User does not exist");

            // creating object
            TodoList todoList = new TodoList
            {
                Title = model.Title,
                UserId = currentUser.Id,
            };
            await todoListRepository.AddAsync(todoList);

            // saving made changes
            await changesSaver.SaveChangesAsync();

            return todoList;
        }

        #endregion Methods
    }
}