using ClientLourd_EatBox.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace ClientLourd_EatBox.Functions
{
    public sealed class Orders
    {
        private static Orders? _instance;

        private static readonly object _lock = new object();

        private static string url = "http://localhost:3000/orders/";

//        private static string socket = "http://localhost:3031/socket/Commercial";

        public HttpClient Client { get; }
        public List<OrdersModel> OrdersObjects { get; set; }
        public string? Value { get; set; }

        public Orders(HttpClient client)
        {
            client.BaseAddress = new Uri(url);
            Client = client;
            OrdersObjects = new List<OrdersModel>();
        }

        public static Orders GetInstance(string value)
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new Orders(new HttpClient())
                        {
                            Value = value
                        };
                    }
                }
            }
            return _instance;
        }


        public async Task<List<OrdersModel>> GetOrdersWithHttpClientFactory()
        {
            this.OrdersObjects = new List<OrdersModel>();
            using (var response = await Client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead))
            {

                response.EnsureSuccessStatusCode();
                Stream stream = response.Content.ReadAsStream();
                StreamReader reader = new StreamReader(stream);
                JObject content = JObject.Parse(reader.ReadToEnd());

                foreach (JObject item in content["orders"])
                {
                    if (item.Type != JTokenType.Null)
                    {
                        this.OrdersObjects.Add(this.CreateNewOrder(item["N_Order"].ToString(), (int)item["State"], (float)item["Detail"]["Price"]));
                    }
                }

                return this.OrdersObjects;
            }
        }

        public OrdersModel CreateNewOrder(string id, int state, float prix)
        {
            OrdersModel newOrder = new OrdersModel(id, state, prix);
            return newOrder;
        }
    }
}
