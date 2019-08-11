using Gevorgyan.TodoListApp.Domain.Helpers;
using System;

namespace Gevorgyan.TodoListApp.Application.Contracts
{
    /// <summary>
    /// Provider of information (session) about current user
    /// </summary>
    public interface IUserInfoProvider
    {
        /// <summary>
        /// Current user name
        /// </summary>
        string UserName { get; }

        /// <summary>
        /// Type of user
        /// </summary>
        UserType UserType { get; }

        /// <summary>
        /// Role of user
        /// </summary>
        UserRole UserRole { get; }

        /// <summary>
        /// Id of user authorization token
        /// </summary>
        Guid UserTokenId { get; }
    }
}