namespace GologoServer.Entities.Interfaces
{
    /// <summary>
    /// interface for classes that map database entities to DTOs
    /// </summary>
    /// <typeparam name="T">T represents the database entity class</typeparam>
    /// <typeparam name="K">K represents the serializable DTO that the database entity should map to</typeparam>
    public interface IMapper<K>
    {
        K Map();
    }
}
