using Gevorgyan.TodoListApp.Domain;
using System.ComponentModel.DataAnnotations;

namespace Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management.Items.Models
{
    /// <summary>
    /// Input model for creating/updating a todo-list item
    /// </summary>
    public class TodoListItemInputModel : InputModelBase
    {
        /// <summary>
        /// Title 
        /// </summary>
        [RequiredInModel]
        [Display(Name = "Title of todo-list")]
        public string Title { get; set; }

        /// <summary>
        /// State of item ("open" or "closed") 
        /// </summary>
        [Display(Name = "State of todo-list item")]
        public TodoListItemState State { get; set; }

        /// <summary>
        /// Id of todo-list entity 
        /// </summary>
        [Display(Name = "Id of todo-list")]
        public int TodoListId { get; set; }
    }
}
