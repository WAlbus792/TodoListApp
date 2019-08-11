using System;
using System.Linq;
using System.Reflection;

namespace Gevorgyan.TodoListApp.Application.Utilities
{
    /// <summary>
    /// Class that checking input models (Extension methods)
    /// </summary>
    public static class InputModelChecker
    {
        /// <summary>
        /// Checks and prepare model for using
        /// </summary>
        public static void CheckAndPrepare(this InputModelBase inputModel)
        {
            // Check model is null
            if (inputModel == null)
                throw new InvalidOperationException("Input model should be instantiated");

            // Gets all properties of model
            var properties = inputModel.GetType().GetProperties();

            // Gets all string properties which are trimable and trimming that
            var stringProperties = properties.Where(p => p.PropertyType == typeof(string) &&
                                                         p.CustomAttributes.All(a => a.AttributeType != typeof(NotTrimableAttribute)));
            foreach (PropertyInfo stringProperty in stringProperties)
            {
                if (stringProperty.GetMethod.Invoke(inputModel, new object[] { }) is string value && !string.IsNullOrWhiteSpace(value))
                    stringProperty.SetMethod.Invoke(inputModel, new object[] { value.Trim() });
            }

            // Perform the same method for childs of model
            var modelProperties = properties.Where(p => p.PropertyType.IsSubclassOf(inputModel.GetType()));
            foreach (PropertyInfo modelProperty in modelProperties)
            {
                InputModelBase propertyValue = modelProperty.GetMethod.Invoke(inputModel, new object[] { }) as InputModelBase;
                propertyValue?.CheckAndPrepare();
            }
        }
    }
}