using System.Threading.Tasks;

namespace Gevorgyan.TodoListApp.Persistence.Repositories
{
    /// <summary>
    /// Database data updater
    /// </summary>
    public interface IDbChangesUpdater
    {
        /// <summary>
        /// Save all made changes to database
        /// </summary>
        void SaveChanges();

        /// <summary>
        /// Save all made changes to database asynchronous
        /// </summary>
        Task SaveChangesAsync();
    }
}
