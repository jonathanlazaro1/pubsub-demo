using System;
using System.ComponentModel.DataAnnotations;
using ReconBank.Models.Users;

namespace ReconBank.Models.Balance
{
    public class Operation
    {
        public Guid Id { get; set; }

        [Required]
        public Guid OriginId { get; set; }

        public virtual User Origin { get; set; }

        public Guid? DestinationId { get; set; }

        public virtual User Destination { get; set; }

        [Required]
        public bool OwnTitularity { get; set; }

        [Required]
        public int AmountInCents { get; set; }

        public DateTime Timestamp { get; set; }
    }
}