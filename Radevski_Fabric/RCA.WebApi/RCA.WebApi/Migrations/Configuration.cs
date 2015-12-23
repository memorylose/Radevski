namespace RCA.WebApi.Migrations
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Microsoft.AspNet.Identity;

    internal sealed class Configuration : DbMigrationsConfiguration<RCA.WebApi.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(RCA.WebApi.ApplicationDbContext context)
        {
            if (!context.Users.Any())
            {
                var userStore = new UserStore<ApplicationUser>(context);
                var userManager = new ApplicationUserManager(userStore);
                ApplicationUser Admin = new ApplicationUser { Email = "", UserName = "admin" };
                userManager.Create(Admin, "Admin@123456");
            }
        }
    }
}
