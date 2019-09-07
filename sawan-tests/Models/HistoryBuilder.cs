namespace sawan.tests
{
    using System;
    using System.Collections.Generic;

    public class HistoryBuilder
    {
        public List<DateTime> Build(string content)
        {
            return new List<DateTime>()
            {
                new DateTime(2019, 1, 7),
                new DateTime(2019, 10, 22),
                new DateTime(2019, 7, 14),
            };
        }
    }
}