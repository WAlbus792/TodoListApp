using System.ComponentModel.DataAnnotations;

namespace Gevorgyan.TodoListApp.Application.Commands.Users.Management.Models
{
    /// <summary>
    /// Input model for creating user
    /// </summary>
    public class CreateUserInputModel : InputModelBase
    {
        /// <summary>
        /// E-mail
        /// </summary>
        [RequiredInModel]
        [Display(Name = "Email of user")]
        public string Email { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        [RequiredInModel]
        [Display(Name = "Name of user")]
        public string Name { get; set; }
        
        /// <summary>
        /// Password
        /// </summary>
        [RequiredInModel]
        [NotTrimable]
        [Display(Name = "Password of user")]
        public string Password { get; set; }

        /// <summary>
        /// Password confirmation 
        /// </summary>
        [RequiredInModel]
        [NotTrimable]
        [Display(Name = "Password confirmation of user")]
        public string PasswordConfirmation { get; set; }
    }
}
