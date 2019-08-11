using Microsoft.EntityFrameworkCore;
using Gevorgyan.TodoListApp.Persistence.EntityConfigs;
using Gevorgyan.TodoListApp.Domain;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gevorgyan.TodoListApp.Persistence
{
    /// <summary>
    /// Db context connected with certain sql server 
    /// </summary>
    public class AppDbContext : DbContext
    {
        #region Constructor

        public AppDbContext(DbContextOptions<AppDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }

        #endregion Constructor

        #region Methods

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new TodoListConfig());
            modelBuilder.ApplyConfiguration(new TodoListItemConfig());
        }

        #endregion Methods
    }
}