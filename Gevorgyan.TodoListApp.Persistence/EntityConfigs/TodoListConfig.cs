using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Gevorgyan.TodoListApp.Domain;

namespace Gevorgyan.TodoListApp.Persistence.EntityConfigs
{
    public class TodoListConfig : IEntityTypeConfiguration<TodoList>
    {
        public void Configure(EntityTypeBuilder<TodoList> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasMany(p => p.Items)
                   .WithOne(d => d.TodoList)
                   .HasForeignKey(d => d.TodoListId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}