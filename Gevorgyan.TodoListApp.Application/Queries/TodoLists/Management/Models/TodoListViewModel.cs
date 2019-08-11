using AutoMapper;
using AutoMapper.Attributes;
using Gevorgyan.TodoListApp.Domain;

namespace Gevorgyan.TodoListApp.Application.Queries.TodoLists.Management.Models
{
    /// <summary>
    /// View model for entity "TodoList"
    /// </summary>
    [MapsFromTodoList]
    public class TodoListViewModel
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
        /// Email of todo-list user 
        /// </summary>
        public string UserEmail { get; set; }
    }

    /// <summary>
    /// Attribute for mapping from entity to model
    /// </summary>
    public class MapsFromTodoListAttribute : MapsFromAttribute
    {
        public MapsFromTodoListAttribute() : base(typeof(TodoList))
        {
        }

        public void ConfigureMapping(IMappingExpression<TodoList, TodoListViewModel> mappingExpression)
        {
            mappingExpression.ForMember(model => model.UserEmail, options => options.MapFrom(entity => entity.User.Email));
        }
    }
}
