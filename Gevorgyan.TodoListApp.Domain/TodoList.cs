using Gevorgyan.TodoListApp.Domain.Helpers;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Gevorgyan.TodoListApp.Domain
{
    /// <summary>
    /// Todo-list
    /// </summary>
    public class TodoList : IEntityWithId
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Title 
        /// </summary>
        public string Title { get; set; }

        #region Navigation properties

        /// <summary>
        /// Collection of "TodoListItem" entities
        /// </summary>
        public ICollection<TodoListItem> Items { get; set; } = new HashSet<TodoListItem>();

        #region User

        /// <summary>
        /// Id of user entity 
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// User
        /// </summary>
        [Required]
        public User User { get; set; }

        #endregion

        #endregion
    }
}
