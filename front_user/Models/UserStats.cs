using ReconBank.Models.Balance;

namespace ReconBank.FrontUser.Models
{
    public class UserStats
    {
        public Balance Balance { get; set; }

        public int OperationsCount { get; set; }

        public int OutgoingAmountInCents { get; set; }

        public int IncomingAmountInCents { get; set; }
    }
}