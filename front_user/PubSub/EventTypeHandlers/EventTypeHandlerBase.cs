using System;
using System.Threading;
using System.Threading.Tasks;
using Google.Cloud.PubSub.V1;

namespace ReconBank.FrontUser.PubSub.EventTypeHandlers
{
    public interface IEventTypeHandler : IDisposable
    {
        Task<SubscriberClient.Reply> HandleAsync(PubsubMessage message, CancellationToken cancellationToken);
    }

    public abstract class EventTypeHandlerBase : IEventTypeHandler
    {
        private bool disposedValue;

        public abstract Task<SubscriberClient.Reply> HandleAsync(PubsubMessage message, CancellationToken cancellationToken);

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects)
                }

                // TODO: free unmanaged resources (unmanaged objects) and override finalizer
                // TODO: set large fields to null
                disposedValue = true;
            }
        }

        // // TODO: override finalizer only if 'Dispose(bool disposing)' has code to free unmanaged resources
        // ~EventTypeHandlerBase()
        // {
        //     // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
        //     Dispose(disposing: false);
        // }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            System.GC.SuppressFinalize(this);
        }

    }
}