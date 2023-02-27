using System.ComponentModel.DataAnnotations;

namespace DynamiBugPlannerBackend.Data
{
    public class UserModel 
    {
        [Key]
        public long Id { get; set; }
        public string Role { get; set; } = "user";
        public string UserName { get; set; } = "user";
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
    }
}