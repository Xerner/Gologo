using System.Data.Common;

namespace GologoServer.Context
{
    public class ConnectionString : IConnectionString
    {
        private readonly IConfiguration _config;

        public ConnectionString(IConfiguration config)
        {
            _config = config;
        }

        private string GetDatabaseName(string connectionString)
        {
            var builder = new DbConnectionStringBuilder
            {
                ConnectionString = connectionString,
            };


            return builder.ContainsKey("Database") ? builder["Database"] as string :
                builder.ContainsKey("Initial Catalog") ? builder["Initial Catalog"] as string :
                throw new System.Exception("Could not find Database or Initial Catalog in connection string " + connectionString);
        }

        public string GetDatabaseConnectionString()
        {
            return _config.GetValue<string>("ConnectionStrings:Gologo");
        }

        public string GetDatabaseName()
        {
            return GetDatabaseName(GetDatabaseConnectionString());
        }
    }

    public interface IConnectionString
    {
        public string DatabaseConnectionString => GetDatabaseConnectionString();
        string GetDatabaseConnectionString();
        public string DbName => GetDatabaseName();
        string GetDatabaseName();
    }
}
