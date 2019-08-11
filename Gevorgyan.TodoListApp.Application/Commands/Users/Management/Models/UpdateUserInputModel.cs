using System.ComponentModel.DataAnnotations;

namespace Gevorgyan.TodoListApp.Application.Commands.Users.Management.Models
{
    /// <summary>
    /// Input model for updating user
    /// </summary>
    public class UpdateUserInputModel : InputModelBase
    {
        /// <summary>
        /// Name
        /// </summary>
        [RequiredInModel]
        [Display(Name = "Name of user")]
        public string Name { get; set; }

        /// <summary>
        /// E-mail
        /// </summary>
        [RequiredInModel]
        [Display(Name = "Email of user")]
        public string Email { get; set; }
    }
}