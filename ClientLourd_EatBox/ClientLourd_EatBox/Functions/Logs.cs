using ClientLourd_EatBox.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ClientLourd_EatBox.Functions
{
    public sealed class Logs
    {
        private static Logs? _instance;

        private static readonly object _lock = new object();

        private static string url = "http://localhost:3031/logs/";

        public HttpClient Client { get; }
        public List<LogsModels> LogsObjects { get; set; }
        public string? Value { get; set; }

        public Logs(HttpClient client)
        {
            client.BaseAddress = new Uri(url);
            Client = client;
            LogsObjects = new List<LogsModels>();
        }

        public static Logs GetInstance(string value)
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new Logs(new HttpClient())
                        {
                            Value = value
                        };
                    }
                }
            }
            return _instance;
        }

        public async Task<List<LogsModels>> GetLogsWithHttpClientFactory()
        {
            this.LogsObjects = new List<LogsModels>();
            using (var response = await Client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead))
            {

                response.EnsureSuccessStatusCode();
                Stream stream = response.Content.ReadAsStream();
                StreamReader reader = new StreamReader(stream);
                JObject content = JObject.Parse(reader.ReadToEnd());

                foreach (JObject item in content[0])
                {
                    if (item.Type != JTokenType.Null)
                    {
                        //this.LogsObjects.Add();
                    }
                }

                return this.LogsObjects;
            }
        }

        public LogsModels CreateNewLog(string ID, string date, string Lastname, string Firstname)
        {
            LogsModels log = new LogsModels(ID, date, Lastname, Firstname);
            return log;
        }

        public LogsModels CreateNewLog(string ID, string date, string Name)
        {
            LogsModels log = new LogsModels(ID, date, Name);
            return log;
        }

    }
}
