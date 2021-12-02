using System;
using System.ComponentModel.DataAnnotations;
using ReconBank.Models.Users;

namespace ReconBank.Models.Balance
{
    public class Balance
    {
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        public virtual User User { get; set; }

        [Required]
        public int AmountInCents { get; set; }

        [Required]
        public DateTime LastUpdatedAt { get; set; }
    }
}