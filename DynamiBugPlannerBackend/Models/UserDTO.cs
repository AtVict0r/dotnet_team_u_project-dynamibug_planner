using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;

namespace DynamiBugPlannerBackend.Models
{
    public class LoginUserDTO
    {   
        [Required]
        public string UserName { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
    
    public class CreateUserDTO : LoginUserDTO
    {  
         [Required]
        public string Email { get; set; } = null!;
         [Required]
        public string FirstName { get; set; } = null!;
         [Required]
        public string LastName { get; set; } = null!;
    }

    public class ManageUserDTO
    {   
        [Required]
        public string Role { get; set; } = null!;
    }

    public class UpdateUserDTO
    {    
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }

    public class AdminUsernameDTO
    {
        public string UserName { get; set; } = null!;
    }

    public class UserIdentityDTO 
    {
        public UserIdentityDTO (ClaimsPrincipal user) 
        {
            this.Email = user.FindFirstValue(ClaimTypes.Email);
            this.Id = Convert.ToInt64(user.FindFirstValue(ClaimTypes.PrimarySid));
            this.Role = user.FindFirstValue(ClaimTypes.Role);
            this.UserName = user.FindFirstValue(ClaimTypes.Name);
            this.FullName = user.FindFirstValue(ClaimTypes.GivenName);
        }

        public string Email { get; set; } = null!;
        public long Id { get; set; }
        public string Role { get; set; } = "user";
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;
    }

    public class UserDTO : UpdateUserDTO
    { 
        public long Id { get; set; }
        public string Role { get; set; } = "user";
        public string UserName { get; set; } = null!;
        public string FullName 
        { 
            get
            {
                return this.FirstName + " " + this.LastName;
            }
        }
    }
}