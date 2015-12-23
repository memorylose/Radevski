using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Radevski.Models.DbEntity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace RCA.WebApi
{
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    //Open role model
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole() : base() { }
        public ApplicationRole(string name) : base(name) { }
        public string Description { get; set; }

    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {

        }

        static ApplicationDbContext()
        {
            //Database.SetInitializer<ApplicationDbContext>(new ApplicationDbInitializer());
            Database.SetInitializer<ApplicationDbContext>(new CreateDatabaseIfNotExists<ApplicationDbContext>());
        }

        public DbSet<Asset> Asset { get; set; }
        public DbSet<BinType> BinType { get; set; }
        public DbSet<FruitCategory> FruitCategory { get; set; }
        public DbSet<Fruit> Fruit { get; set; }
        public DbSet<LocationType> LocationType { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<Customization> Customization { get; set; }
        public DbSet<Receivable> Receivable { get; set; }


        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}