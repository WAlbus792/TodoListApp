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
    /// Command for updating todo-list for current user
    /// </summary>
    public class UpdateTodoListCommand
    {
        #region Constructor

        public UpdateTodoListCommand(
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
        /// <returns>updated todo-list</returns>
        public async Task<TodoList> Execute(int id, TodoListInputModel model)
        {
            // Check access rights: User
            await accessRightChecker.CheckUserAuthToken();

            // pretreatment of model
            model.CheckAndPrepare();

            // gets the current user
            User currentUser = await userRepository.Where(e => e.Email == userInfoProvider.UserName).AsNoTracking().FirstOrDefaultAsync();
            if (currentUser is null) throw new BusinessException("User does not exist");

            // gets the todo-list
            TodoList todoList = await todoListRepository.GetById(id).FirstOrDefaultAsync();
            if(todoList is null) throw new BusinessException("Todo-list does not exist");
            if (!currentUser.IsAdmin && todoList.UserId != currentUser.Id) throw new BusinessException("User cannot change a todo-list not belonging him");

            // updates the todo-list
            todoList.Title = model.Title;

            // saves made changes
            await changesSaver.SaveChangesAsync();

            return todoList;
        }

        #endregion Methods
    }
}