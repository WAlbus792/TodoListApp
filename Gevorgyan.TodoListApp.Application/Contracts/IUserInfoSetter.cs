using Gevorgyan.TodoListApp.Domain.Helpers;
using System;

namespace Gevorgyan.TodoListApp.Application.Contracts
{
    /// <summary>
    /// Provider of information (session) about current user
    /// </summary>
    public interface IUserInfoSetter : IUserInfoProvider
    {
        /// <summary>
        /// Current user name
        /// </summary>
        new string UserName { get; set; }

        /// <summary>
        /// Type of user
        /// </summary>
        new UserType UserType { get; set; }

        /// <summary>
        /// Role of user
        /// </summary>
        new UserRole UserRole { get; set; }

        /// <summary>
        /// Id of user authorization token
        /// </summary>
        new Guid UserTokenId { get; set; }
    }
}
