using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;

namespace DynamiBugPlannerBackend.Data
{

    [Index("UserName", IsUnique = true)]
    [Index("Email", IsUnique = true)]
    public class UserModel 
    {
        private string password = null!;
        
        [Key]
        public long Id { get; set; }
        public string Role { get; set; } = "user";
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string FullName => this.FirstName + " " + this.LastName;
        public string Password 
        { 
            get
            {
                return this.password;
            }

            set
            {
                using(var md5 = MD5.Create())
                {
                    byte[] passwordHash = md5.ComputeHash(Encoding.UTF8.GetBytes(value))!;
                    this.password = Encoding.UTF8.GetString(passwordHash, 0, passwordHash.Length);
                
                }
            } 
        }
        public DateTime Expiration { get; set; } = DateTime.Now!;
    }
}