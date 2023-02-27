using System.ComponentModel.DataAnnotations;

namespace DynamiBugPlannerBackend.Models
{
    public class UserDTO
    {        
        public long Id { get; set; }
        public string Role { get; set; } = "user";
        public string UserName { get; set; } = "user";
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string FullName 
        { 
            get
            {
                return this.FirstName + " " + this.LastName;
            }
        }
    }
}