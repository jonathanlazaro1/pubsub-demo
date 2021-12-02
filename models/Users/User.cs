using System;
using System.ComponentModel.DataAnnotations;

namespace ReconBank.Models.Users
{
    public class User
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string Name { get; set; }
    }
}