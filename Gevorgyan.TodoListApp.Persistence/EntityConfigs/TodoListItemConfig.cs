using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Gevorgyan.TodoListApp.Domain;

namespace Gevorgyan.TodoListApp.Persistence.EntityConfigs
{
    public class TodoListItemConfig: IEntityTypeConfiguration<TodoListItem>
    {
        public void Configure(EntityTypeBuilder<TodoListItem> builder)
        {
            builder.HasKey(e => e.Id);
        }
    }
}