using System.ComponentModel.DataAnnotations;

namespace Gevorgyan.TodoListApp.Application.Commands.TodoLists.Management.Models
{
    /// <summary>
    /// Input model for creating a todo-list
    /// </summary>
    public class TodoListInputModel : InputModelBase
    {
        /// <summary>
        /// Title 
        /// </summary>
        [RequiredInModel]
        [Display(Name = "Title of todo-list")]
        public string Title { get; set; }
    }
}
