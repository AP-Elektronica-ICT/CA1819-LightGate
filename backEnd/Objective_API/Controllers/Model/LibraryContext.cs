using Microsoft.EntityFrameworkCore;

namespace Model{

    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options): base(options)
        {

        }

        public DbSet<Objective> Objectives {get; set;}
        public DbSet<Label> Labels {get; set;}
       
    }
}