using Gevorgyan.TodoListApp.Domain.Helpers;

namespace Gevorgyan.TodoListApp.Application.Commands.Users.Models
{
    /// <summary>
    /// Model of user authentication data for authorization
    /// </summary>
    public class AuthenticateUserResultModel
    {
        /// <summary>
        /// Authorization token 
        /// </summary>
        public string AccessToken { get; set; }

        /// <summary>
        /// User name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// User email
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Role of user
        /// </summary>
        public UserRole Role { get; set; }
    }
}
