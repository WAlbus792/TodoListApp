using Gevorgyan.TodoListApp.Domain.Helpers;
using System;
using System.Collections.Generic;

namespace Gevorgyan.TodoListApp.Domain
{
    /// <summary>
    /// User
    /// </summary>
    public class User : IEntityWithId
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// E-mail
        /// </summary>
        /// <remarks>
        /// Username
        /// </remarks>
        public string Email { get; set; }

        /// <summary>
        /// Name 
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Hash of password (real password will not be saved in db)
        /// </summary>
        public string PasswordHash { get; set; }

        /// <summary>
        /// User is admin?
        /// </summary>
        public bool IsAdmin { get; set; }

        /// <summary>
        /// Id of authentication token 
        /// </summary>
        /// <remarks>
        /// with every significant changes in the account it will be changed (for security reasons)
        /// </remarks>
        public Guid AuthenticationTokenId { get; set; }

        #region Navigation properties

        /// <summary>
        /// Collection of "TodoList" entities
        /// </summary>
        public ICollection<TodoList> TodoLists { get; set; } = new HashSet<TodoList>();

        #endregion
    }
}
