using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;

namespace Gevorgyan.TodoListApp.Persistence
{
    /// <summary>
    /// Factory for db context to use in migrations
    /// </summary>
    internal class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            string connectionString = "Server=(LocalDB)\\MSSQLLocalDB;Initial Catalog=RestApi_Dev;Trusted_Connection=True;";
            Console.WriteLine("Connection string: {0}", connectionString);
            builder.UseSqlServer(connectionString);

            return new AppDbContext(builder.Options);
        }
    }
}