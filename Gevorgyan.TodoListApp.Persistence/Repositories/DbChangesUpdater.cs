using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Gevorgyan.TodoListApp.Persistence.Repositories
{
    /// <summary>
    /// Database data updater
    /// </summary>
    /// <remarks>
    /// Save all made changes in <see cref="DbContext">Context</see> to database
    /// </remarks>
    public class DbChangesUpdater<TDbContext> : IDbChangesUpdater where TDbContext : DbContext
    {
        #region Constructor

        public DbChangesUpdater(TDbContext context) => this.context = context;

        #endregion Constructor

        #region Fields

        private readonly TDbContext context;

        #endregion Fields

        #region IDbChangesUpdater

        /// <summary>
        /// Save all made changes to database
        /// </summary>
        public void SaveChanges() => context.SaveChanges();

        /// <summary>
        /// Save all made changes to database asynchronous
        /// </summary>
        public async Task SaveChangesAsync() => await context.SaveChangesAsync();

        #endregion
    }
}
