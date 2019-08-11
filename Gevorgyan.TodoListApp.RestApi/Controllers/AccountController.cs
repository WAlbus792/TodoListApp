using Gevorgyan.TodoListApp.Application.Commands.Users;
using Gevorgyan.TodoListApp.Application.Commands.Users.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.RestApi.Controllers
{
    /// <summary>
    /// Interaction with user account
    /// </summary>
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        #region Constructor

        public AccountController(AuthenticateUserCommand authenticateUserCommand) => this.authenticateUserCommand = authenticateUserCommand;

        #endregion Constructor

        #region Fields

        private readonly AuthenticateUserCommand authenticateUserCommand;

        #endregion Fields

        #region Methods 

        /// <summary>
        /// Authenticates user
        /// </summary>
        [HttpPost]
        public async Task<AuthenticateUserResultModel> Authenticate([FromBody]AuthenticateUserInputModel input) => await authenticateUserCommand.Execute(input);

        #endregion Methods
    }
}
