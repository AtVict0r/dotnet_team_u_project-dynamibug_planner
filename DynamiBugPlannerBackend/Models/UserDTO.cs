using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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