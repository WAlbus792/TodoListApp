using System.ComponentModel.DataAnnotations;

namespace Gevorgyan.TodoListApp.Application.Commands.Users.Models
{
    /// <summary>
    /// Input model of data for user authentication
    /// </summary>
    public class AuthenticateUserInputModel : InputModelBase
    {
        /// <summary>
        /// Email
        /// </summary>
        [RequiredInModel]
        [Display(Name = "Email of user")]
        public string UserName { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [RequiredInModel]
        [Display(Name = "Password of user")]
        [NotTrimable]
        public string Password { get; set; }
    }
}
