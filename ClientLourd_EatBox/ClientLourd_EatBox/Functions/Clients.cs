using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;


namespace ClientLourd_EatBox.Functions
{
    public sealed class Clients
    {

        private Clients(){}

        private static Clients? _instance;

        private static readonly object _lock = new object();

        public static Clients GetInstance(string value)
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new Clients
                        {
                            Value = value
                        };
                    }
                }
            }
            return _instance;
        }

        public string? Value { get; set; }

        public async void GetAllCLients(HttpClient client, string url)
        {
            var content = await client.GetStringAsync(url);
            Console.WriteLine(content);
          
        }
    }
}
