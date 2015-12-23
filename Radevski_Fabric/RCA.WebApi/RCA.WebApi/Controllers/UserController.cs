using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using RCA.Model.Dto;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace RCA.WebApi.Controllers
{
    public class UserController : ApiController
    {
        #region Initialize

        private ApplicationUserManager _userManager;
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
                return Ok(new { success = false, message = "Create user failed." });
            }
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
