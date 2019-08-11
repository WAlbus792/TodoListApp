using AutoMapper.QueryableExtensions;
using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Application.Exceptions;
using Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management.Models;
using Gevorgyan.TodoListApp.Domain;
using Gevorgyan.TodoListApp.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management
{
    /// <summary>
    /// Returns the todo-list of the current user by Id 
    /// </summary>
    public class GetTodoListByIdQuery
    {
        #region Constructor

        public GetTodoListByIdQuery(
            IAccessRightChecker accessRightChecker,
            IRepository<TodoList> todoListRepository,
            IUserInfoProvider userInfoProvider
            )
        {
            this.accessRightChecker = accessRightChecker;
            this.todoListRepository = todoListRepository;
            this.userInfoProvider = userInfoProvider;
        }

        #endregion Constructor

        #region Fields

        private readonly IAccessRightChecker accessRightChecker;
        private readonly IRepository<TodoList> todoListRepository;
        private readonly IUserInfoProvider userInfoProvider;

        #endregion Fields

        #region Methods

        /// <summary>
        /// Build the query
        /// </summary>
        public async Task<TodoListViewModel> Build(int id)
        {
            // Check access rights: User
            await accessRightChecker.CheckUserAuthToken();

            // if item belongs to the current user
            if (!await todoListRepository.AnyAsync(e => e.Id == id && e.User.Email == userInfoProvider.UserName))
                throw new BusinessException("User does not have the todo-list with specified id");

            return await todoListRepository.GetById(id).ProjectTo<TodoListViewModel>().FirstOrDefaultAsync();
        }

        #endregion Methods
    }
}
