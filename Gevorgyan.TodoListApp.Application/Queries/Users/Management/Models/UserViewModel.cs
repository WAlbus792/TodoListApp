using AutoMapper;
using AutoMapper.Attributes;
using Gevorgyan.TodoListApp.Domain;

namespace Gevorgyan.TodoListApp.Application.Queries.Users.Management.Models
{
    /// <summary>
    /// User view model 
    /// </summary>
    [MapsFromUser]
    public class UserViewModel
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
    }

    /// <summary>
    /// Attribute for mapping from entity to model
    /// </summary>
    public class MapsFromUserAttribute : MapsFromAttribute
    {
        public MapsFromUserAttribute() : base(typeof(User))
        {
        }

        public void ConfigureMapping(IMappingExpression<User, UserViewModel> mappingExpression)
        {
        }
    }
}
