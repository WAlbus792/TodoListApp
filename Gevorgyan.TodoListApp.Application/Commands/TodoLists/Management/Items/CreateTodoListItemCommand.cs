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
    /// Command for creating a todo-list item for the current user
    /// </summary>
    public class CreateTodoListItemCommand
    {
        #region Constructor

        public CreateTodoListItemCommand(
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
        /// <returns>created todo-list item</returns>
        public async Task<TodoListItem> Execute(TodoListItemInputModel model)
        {
            // Check access rights: User
            await accessRightChecker.CheckUserAuthToken();

            // pretreatment of model
            model.CheckAndPrepare();

            // specific validation
            if(!typeof(TodoListItemState).IsEnumDefined(model.State)) throw new BusinessException("State of todo-list item specified not correctly");

            // gets the current user
            User currentUser = await userRepository.Where(e => e.Email == userInfoProvider.UserName).AsNoTracking().Include(e => e.TodoLists).FirstOrDefaultAsync();
            if (currentUser is null) throw new BusinessException("User does not exist");
            if (!currentUser.TodoLists.Any(e => e.Id == model.TodoListId))
                throw new BusinessException("Todo-list for which you want to add the specified item does not belong to the current user");

            // creating an object
            TodoListItem todoListItem = new TodoListItem
            {
                Title = model.Title,
                TodoListId = model.TodoListId,
                State = model.State
            };
            await todoListItemRepository.AddAsync(todoListItem);

            // saving made changes
            await changesSaver.SaveChangesAsync();

            return todoListItem;
        }

        #endregion Methods
    }
}