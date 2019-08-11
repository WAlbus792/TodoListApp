using Gevorgyan.TodoListApp.Application.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Formatters;
using System;

namespace Gevorgyan.TodoListApp.RestApi.Filters
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private class ErrorResponse
        {
            public string Message { get; set; }

            public int StatusCode { get; set; }
        }

        public void OnException(ExceptionContext context)
        {
            Exception exception = context.Exception;
            string errorMessage = "Occured an internal server error";
            int statusCode = 500; // by default internal server error code

            if (exception is AccessDeniedException) // Exception if invoke the method not allowed by user 
            {
                errorMessage = "Resource is forbidden"; // throws user out in UI 
                statusCode = 403; // Forbidden
            }
            else if (exception is BusinessException) // Exception of business-logic (validation)
            {
                errorMessage = exception.Message;
                statusCode = 400;
            }

            ErrorResponse response = new ErrorResponse { Message = errorMessage, StatusCode = statusCode };

            context.Result = new ObjectResult(response)
            {
                StatusCode = response.StatusCode,
                DeclaredType = typeof(ErrorResponse),
                ContentTypes = new MediaTypeCollection { "application/json" }
            };
        }
    }

}
