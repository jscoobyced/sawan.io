namespace sawan.tests
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using MongoDB.Driver;

    public class MockAsyncCursor<T> : IAsyncCursor<T>
    {
        private List<T>[] dataArray;
        private int index = -1;

        public MockAsyncCursor(List<T>[] dataArray)
        {
            this.dataArray = dataArray;
        }

        public IEnumerable<T> Current => this.dataArray[index];

        public void Dispose()
        {
            this.dataArray = null;
        }

        public bool MoveNext(CancellationToken cancellationToken = default(CancellationToken))
        {
            if (index < this.dataArray.Length - 1)
            {
                index++;
            }

            return index < this.dataArray.Length - 1;
        }

        public async Task<bool> MoveNextAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            return await Task.FromResult<bool>(this.MoveNext(cancellationToken));
        }
    }
}