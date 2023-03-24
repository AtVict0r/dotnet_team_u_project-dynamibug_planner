using System;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using DynamiBugPlannerBackend.Data;

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
        public string FullName { get; set; } = null!;
        public string UserName { get; set; } = null!;
    }

    public class UserIdentityDTO 
    {
        public UserIdentityDTO () {}

        public UserIdentityDTO (UserDTO user) 
        {
            this.Id = user.Id;
            this.UserName = user.UserName;
            this.Email = user.Email!;
            this.FirstName = user.FirstName!;
            this.LastName = user.LastName!;
            this.FullName = user.FullName;
            this.Role = user.Role;
        }

        public UserIdentityDTO (ClaimsPrincipal user) 
        {
            this.Id = Convert.ToInt64(user.FindFirstValue(ClaimTypes.PrimarySid));
            this.UserName = user.FindFirstValue(ClaimTypes.Name);
            this.Email = user.FindFirstValue(ClaimTypes.Email);
            this.FullName = user.FindFirstValue(ClaimTypes.GivenName);
            this.Role = user.FindFirstValue(ClaimTypes.Role);
            this.Expiration = DateTime.Parse(user.FindFirstValue(ClaimTypes.Expiration));
        }

        public long Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Role { get; set; } = "user";
        public DateTime Expiration { get; set; } = DateTime.Now!;
    }

    public class UserDTO : UpdateUserDTO
    { 
        public long Id { get; set; }
        public string Role { get; set; } = "user";
        public string UserName { get; set; } = null!;
        public string FullName { get; set; } = null!;
    }
}