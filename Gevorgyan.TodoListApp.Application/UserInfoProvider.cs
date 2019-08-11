using Gevorgyan.TodoListApp.Application.Contracts;
using Gevorgyan.TodoListApp.Domain.Helpers;
using System;

namespace Gevorgyan.TodoListApp.Application
{
    /// <summary>
    /// Provider of information (session) about current user
    /// </summary>
    public class UserInfoProvider : IUserInfoSetter
    {
        /// <summary>
        /// Current user name
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Type of user
        /// </summary>
        public UserType UserType { get; set; }

        /// <summary>
        /// Role of user
        /// </summary>
        public UserRole UserRole { get; set; }

        /// <summary>
        /// Id of user authorization token
        /// </summary>
        public Guid UserTokenId { get; set; }
    }
}
