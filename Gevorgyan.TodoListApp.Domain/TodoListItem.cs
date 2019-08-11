using Gevorgyan.TodoListApp.Domain.Helpers;
using System.ComponentModel.DataAnnotations;

namespace Gevorgyan.TodoListApp.Domain
{
    /// <summary>
    /// Item of TodoList
    /// </summary>
    /// <remarks>
    /// It's also possible not to create this entity and this task solve with entity "TodoList" (using Tree-View rule)
    /// </remarks>
    public class TodoListItem : IEntityWithId
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Title 
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// State of item ("open" or "closed") 
        /// </summary>
        public TodoListItemState State { get; set; }

        #region Navigation properties

        #region Todo-list

        /// <summary>
        /// Id of Todo-list entity 
        /// </summary>
        public int TodoListId { get; set; }

        /// <summary>
        /// Todo-list entity 
        /// </summary>
        [Required]
        public TodoList TodoList { get; set; }

        #endregion

        #endregion
    }
}
