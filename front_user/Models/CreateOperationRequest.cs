using System;
using System.ComponentModel.DataAnnotations;

namespace ReconBank.FrontUser.Models
{
    public class CreateOperationRequest
    {

        private Guid? _destinationId;

        private int _amountInCents;

        private bool _ownTitularity;

        [Required]
        public OperationType Type { get; set; }

        [Required]
        public Guid OriginId { get; set; }

        public Guid? DestinationId
        {
            get => this._destinationId;
            set
            {
                Guid? newDestinationId = null;
                if (this.Type == OperationType.TRANSFER)
                {
                    newDestinationId = value;
                }
                this._destinationId = newDestinationId;
            }
        }


        [Required]
        public int AmountInCents
        {
            get
            {
                return this.Type == OperationType.OUTGOING
                    ? this._amountInCents * (-1)
                    : this._amountInCents;
            }
            set { this._amountInCents = (Math.Abs(value)); }
        }

        [Required]
        public bool OwnTitularity
        {
            get => this._ownTitularity;
            set
            {
                var newOwnTitularity = false;
                if (this.Type == OperationType.OUTGOING)
                {
                    newOwnTitularity = value;
                }
                this._ownTitularity = newOwnTitularity;
            }
        }
    }
}