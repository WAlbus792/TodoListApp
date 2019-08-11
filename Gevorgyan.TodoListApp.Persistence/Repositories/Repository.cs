using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Gevorgyan.TodoListApp.Domain.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Gevorgyan.TodoListApp.Persistence.Repositories
{
    /// <summary>
    /// Repository of entity
    /// </summary>
    /// <typeparam name="TEntity">type of Entity, which instances are kept in repository</typeparam>
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : class, IEntityWithId<int>
    {
        #region Constructor

        public Repository(AppDbContext context)
        {
            Context = context;
            SourceQuery = context.Set<TEntity>();
        }

        #endregion Constructor

        #region Fields

        /// <summary>
        /// Context
        /// </summary>
        protected AppDbContext Context { get; }

        /// <summary>
        /// Current query
        /// </summary>
        protected IQueryable<TEntity> SourceQuery;

        #endregion Fields

        #region Add

        /// <summary>
        /// Adds a new object
        /// </summary>
        public void Add(TEntity objectToAdd) => Context.Set<TEntity>().Add(objectToAdd);

        /// <summary>
        /// Adds a new object asynchronous
        /// </summary>
        public Task AddAsync(TEntity objectToAdd) => Context.Set<TEntity>().AddAsync(objectToAdd);

        /// <summary>
        /// Adds a collection of new objects
        /// </summary>
        public void AddRange(IEnumerable<TEntity> objectsToAdd) => Context.Set<TEntity>().AddRange(objectsToAdd);

        /// <summary>
        /// Adds a collection of new objects asynchronous
        /// </summary>
        public Task AddRangeAsync(IEnumerable<TEntity> objectsToAdd) => Context.Set<TEntity>().AddRangeAsync(objectsToAdd);

        #endregion Add

        #region Remove

        /// <summary>
        /// Removes the instance by its id
        /// </summary>
        /// <param name="instanceId">id of instance</param>
        public void Remove(int instanceId) => Remove(GetById(instanceId).FirstOrDefault());

        /// <summary>
        /// Removes the instance by its id asynchronous
        /// </summary>
        /// <param name="instanceId">id of instance</param>
        public async Task RemoveAsync(int instanceId) => Remove(await GetById(instanceId).FirstOrDefaultAsync());

        /// <summary>
        /// Removes the instances by their ids 
        /// </summary>
        /// <param name="ids">ids of instances</param>
        public void RemoveRange(IEnumerable<int> ids) => Remove(GetByIds(ids).ToArray());

        /// <summary>
        /// Removes the instances by their ids asynchronous
        /// </summary>
        /// <param name="ids">ids of instances</param>
        public async Task RemoveRangeAsync(IEnumerable<int> ids) => Remove(await GetByIds(ids).ToArrayAsync());

        /// <summary>
        /// Common method to remove the collection of array
        /// </summary>
        private void Remove(params TEntity[] instances) => Context.Set<TEntity>().RemoveRange(instances);

        #endregion Remove

        #region Queries

        /// <summary>
        /// Method gets all instances by their Ids 
        /// </summary>
        /// <param name="ids">ids of instances</param>
        public IQueryable<TEntity> GetByIds(IEnumerable<int> ids) => SourceQuery.Where(o => ids.Contains(o.Id));

        /// <summary>
        /// Returns the instance by its Id 
        /// </summary>
        /// <param name="id">id of the instance</param>
        public IQueryable<TEntity> GetById(int id) => SourceQuery.Where(o => o.Id == id);

        #endregion Queries

        #region IQueryable

        /// <summary>Returns an enumerator that iterates through the collection.</summary>
        /// <returns>An enumerator that can be used to iterate through the collection.</returns>
        public IEnumerator<TEntity> GetEnumerator() => SourceQuery.GetEnumerator();

        /// <summary>Returns an enumerator that iterates through a collection.</summary>
        /// <returns>An <see cref="T:System.Collections.IEnumerator"></see> object that can be used to iterate through the collection.</returns>
        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        /// <summary>Gets the type of the element(s) that are returned when the expression tree associated with this instance of <see cref="T:System.Linq.IQueryable"></see> is executed.</summary>
        /// <returns>A <see cref="T:System.Type"></see> that represents the type of the element(s) that are returned when the expression tree associated with this object is executed.</returns>
        public Type ElementType => SourceQuery.ElementType;

        /// <summary>Gets the expression tree that is associated with the instance of <see cref="T:System.Linq.IQueryable"></see>.</summary>
        /// <returns>The <see cref="T:System.Linq.Expressions.Expression"></see> that is associated with this instance of <see cref="T:System.Linq.IQueryable"></see>.</returns>
        public Expression Expression => SourceQuery.Expression;

        /// <summary>Gets the query provider that is associated with this data source.</summary>
        /// <returns>The <see cref="T:System.Linq.IQueryProvider"></see> that is associated with this data source.</returns>
        public IQueryProvider Provider => SourceQuery.Provider;

        #endregion IQueryable

        #region IAsyncEnumerableAccessor

        /// <summary>
        /// This API supports the Entity Framework Core infrastructure and is not intended to be used
        /// directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public IAsyncEnumerable<TEntity> AsyncEnumerable => ((IAsyncEnumerableAccessor<TEntity>)SourceQuery).AsyncEnumerable;

        #endregion IAsyncEnumerableAccessor
    }
}