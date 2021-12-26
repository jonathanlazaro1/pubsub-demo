using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ReconBank.Models.Users;

namespace ReconBank.Models.Balance
{
    public class Operation
    {
        public Guid Id { get; set; }

        [NotMapped]
        public OperationType Type
        {
            get
            {
                if (this.DestinationId.HasValue)
                {
                    return OperationType.TRANSFER;
                }

                return this.AmountInCents == Math.Abs(this.AmountInCents)
                    ? OperationType.INCOMING
                    : OperationType.OUTGOING;
            }
        }

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