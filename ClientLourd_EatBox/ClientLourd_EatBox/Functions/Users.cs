using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.IO;
using Newtonsoft.Json.Linq;
using ClientLourd_EatBox.Models;
using Newtonsoft.Json;
using System.Windows.Controls;

namespace ClientLourd_EatBox.Functions
{
    public sealed class Users
    {
        private static Users? _instance;

        private static readonly object _lock = new object();

        private static string url = "http://localhost:3032/";

        public HttpClient Client { get; }

        public List<UserModel> ClientsObjects { get; }
        public List<UserModel> LivreursObjects { get; }
        public List<UserModel> RestoObjects { get; }
        public List<UserModel> DevelopersObjects { get; }


        private Users(HttpClient client)
        {
            client.BaseAddress = new Uri(url);
            //client.DefaultRequestHeaders.Add("Authorization", "YOUR_ASSEMBLY_AI_TOKEN");
            Client = client;
            ClientsObjects = new List<UserModel>();
            LivreursObjects = new List<UserModel>();
            RestoObjects = new List<UserModel>();
            DevelopersObjects = new List<UserModel>();

        }


        public static Users GetInstance(string value)
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new Users(new HttpClient())
                        {
                            Value = value
                        };
                    }
                }
            }
            return _instance;
        }

        public string? Value { get; set; }


        public UserModel CreateNewUser(string id, string email, string name, string firstname, string role, bool susp)
        {
            return new UserModel(id, email, firstname, name, role, susp);
        }


        public UserModel CreateNewUser(string id, string email, string name, string type, bool susp)
        {
            return new UserModel(id, email, name, type, susp);
        }

        /*public static UserModel CreateNewLivreur(string name, string firstname, string email, string role)
        {
            return new UserModel(email, role, firstname, name);
        }*/

        public async void SuspendUserWithHttpClientFactory(string id)
        {
            UserModel modified = ClientsObjects.Concat(RestoObjects).Concat(LivreursObjects).Concat(DevelopersObjects).FirstOrDefault(e => e._id == id);
            HttpContent payload = new StringContent($"{{\"suspended\":\"{!modified.suspended}\"}}", Encoding.UTF8, "application/json");
            using (var response = await Client.PutAsync(url + "suspend/" + id.ToString(), payload))
            {
                response.EnsureSuccessStatusCode();
                modified.suspended = !modified.suspended;
            }
        }

        public async void DeleteUserWithHttpClientFactory(string id)
        {
            UserModel modified = ClientsObjects.Concat(RestoObjects).Concat(LivreursObjects).Concat(DevelopersObjects).FirstOrDefault(e => e._id == id);
            //HttpContent payload = new StringContent($"{{\"suspended\":\"{!modified.suspended}\"}}", Encoding.UTF8, "application/json");
            using (var response = await Client.DeleteAsync(url+id.ToString()))
            {
                response.EnsureSuccessStatusCode();
                List<UserModel> all = ClientsObjects.Concat(RestoObjects).Concat(LivreursObjects).Concat(DevelopersObjects).ToList();
                all.Remove(modified);
            }
        }

        public async Task<(List<UserModel>, List<UserModel>, List<UserModel>, List<UserModel>)> GetUsersWithHttpClientFactory()
        {
            using (var response = await Client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead))
            {

                response.EnsureSuccessStatusCode();
                Stream stream = response.Content.ReadAsStream();
                StreamReader reader = new StreamReader(stream);
                JArray content = JArray.Parse(reader.ReadToEnd());

                foreach (JObject item in content)
                {
                    if (item.GetValue("livreur") is not null)
                    {
                        if (item["livreur"].Type != JTokenType.Null)
                        {
                            this.LivreursObjects.Add(this.CreateNewUser(item["_id"].ToString(), item["Email"].ToString(), item["livreur"]["Firstname"].ToString(), item["livreur"]["Lastname"].ToString(), "Livreur", (bool)item["suspended"]));
                        }
                        
                    }

                    if (item.GetValue("client") is not null)
                    {
                        if (item["client"].Type != JTokenType.Null)
                        {
                            this.ClientsObjects.Add(this.CreateNewUser(item["_id"].ToString(), item["Email"].ToString(), item["client"]["Firstname"].ToString(), item["client"]["Name"].ToString(), "Client", (bool)item["suspended"]));

                        }
                    }

                    if (item.GetValue("restaurant") is not null)
                    {
                        if (item["restaurant"].Type != JTokenType.Null)
                        {
                            this.RestoObjects.Add(this.CreateNewUser(item["_id"].ToString(), item["Email"].ToString(), item["restaurant"]["Name"].ToString(), item["restaurant"]["Type"].ToString(), (bool)item["suspended"]));
                        }
                    }

                    if (item.GetValue("developpeur") is not null)
                    {
                        if (item["developpeur"].Type != JTokenType.Null)
                        {
                            //this.DevelopersObjects.Add(this.CreateNewUser(item["_id"].ToString(), item["Email"].ToString(), item["developpeur"]["Firstname"].ToString(), item["developpeur"]["Lastname"].ToString(), "Developpeur", (bool)item["suspended"]));
                        }
                    }
                }
            }


            return (this.LivreursObjects, this.RestoObjects, this.ClientsObjects, this.DevelopersObjects);

        }
    }


}
