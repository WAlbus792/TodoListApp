using System;

namespace Gevorgyan.TodoListApp.Application.Exceptions
{
    public class AccessDeniedException : Exception
    {
        public AccessDeniedException() { }

        public AccessDeniedException(string message) : base(message) { }
    }
}
