using System;

namespace Gevorgyan.TodoListApp.Application.Exceptions
{
    /// <summary>
    /// Exception that occurs in business-logic
    /// </summary>
    public class BusinessException : Exception
    {
        public BusinessException(string message) : base(message) { }

        public BusinessException(string message, Exception innerException) : base(message, innerException) { }
    }
}