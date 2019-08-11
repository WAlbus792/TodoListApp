namespace Gevorgyan.TodoListApp.Domain.Helpers
{
    /// <summary>
    /// Type of user
    /// </summary>
    public enum UserType
    {
        /// <summary>
        /// Authenticated
        /// </summary>
        /// <remarks>
        /// User is authenticated
        /// </remarks>
        Authenticated = 1,

        /// <summary>
        /// Anonymous
        /// </summary>
        /// <remarks>
        /// User is not authenticated (anonymous)
        /// </remarks>
        Anonymous,

        /// <summary>
        /// System
        /// </summary>
        /// <remarks>
        /// User is system
        /// </remarks>
        System
    }
}