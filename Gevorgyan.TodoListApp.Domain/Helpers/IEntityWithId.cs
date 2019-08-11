using System;

namespace Gevorgyan.TodoListApp.Domain.Helpers
{
    /// <summary>
    /// Interface for entities, which instances have Id
    /// </summary>
    /// <typeparam name="T">Type of Id</typeparam>
    public interface IEntityWithId<T> where T : IEquatable<T>
    {
        /// <summary>
        /// Id
        /// </summary>
        T Id { get; set; }
    }

    /// <summary>
    /// Interface for entities, which instances have Id with Int type
    /// </summary>
    public interface IEntityWithId : IEntityWithId<int>
    {
    }
}