using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using RCA.Model.Dto;
using System.Collections.Generic;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Linq;

namespace RCA.WebApi.Controllers
{
    public class UserController : ApiController
    {
        #region Initialize

        private ApplicationUserManager _userManager;
        private ApplicationDbContext _db;

        public UserController()
        {
            _db = new ApplicationDbContext();
        }
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? System.Web.HttpContext.Current.Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return System.Web.HttpContext.Current.Request.GetOwinContext().Authentication;
            }
        }

        #endregion

        #region Create user

        /// <summary>
        /// Create user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public IHttpActionResult CreateUser(User user)
        {
            var crUser = new ApplicationUser() { UserName = user.Username, Email = user.Email };
            IdentityResult result = UserManager.Create(crUser, user.Password);
            if (result.Succeeded)
            {
                return Ok(new { success = true });
            }
            else
            {
                return Ok(new { success = false, message = result.Errors });
            }
        }


        /// <summary>
        /// Delete user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [System.Web.Http.HttpGet]
        public bool DeleteUser(string id)
        {
            var user = UserManager.FindById(id);
            var result = UserManager.Delete(user);
            if (!result.Succeeded)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        /// <summary>
        /// Get users
        /// </summary>
        /// <returns></returns>
        [System.Web.Http.HttpGet]
        public List<User> GetUsers()
        {
            var users = (from c in UserManager.Users.OrderByDescending(p => p.Id).ToList()
                         select new User()
                         {
                             Id = c.Id,
                             Username = c.UserName,
                             Email = c.Email
                         }).ToList();
            return users;
        }

        #endregion

        #region Login

        /// <summary>
        /// User login
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public IHttpActionResult Login(User user)
        {
            if (!string.IsNullOrEmpty(user.Username) && !string.IsNullOrEmpty(user.Password))
            {
                var lgUser = UserManager.Find(user.Username, user.Password);
                if (lgUser != null)
                    return Ok(new { success = true });
                else
                    return Ok(new { success = false, message = "Username or Password is incorrect" });
            }
            else
            {
                return Ok(new { success = false, message = "Username or Password is empty" });
            }
        }

        #endregion
    }
}
