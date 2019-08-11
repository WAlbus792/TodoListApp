using AutoMapper;
using AutoMapper.Attributes;
using Gevorgyan.TodoListApp.Domain;

namespace Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management.Items.Models
{
    /// <summary>
    /// View model for entity "TodoListItem"
    /// </summary>
    [MapsFromTodoListItem]
    public class TodoListItemViewModel
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
    }

    /// <summary>
    /// Attribute for mapping from entity to model
    /// </summary>
    public class MapsFromTodoListItemAttribute : MapsFromAttribute
    {
        public MapsFromTodoListItemAttribute() : base(typeof(TodoListItem))
        {
        }

        public void ConfigureMapping(IMappingExpression<TodoListItem, TodoListItemViewModel> mappingExpression)
        {
        }
    }
}
