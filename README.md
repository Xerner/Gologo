# Gologo 

*A full-stack application for practice purposes*

- Angular front-end that uses a built-in canvas game engine
- ASP.Net Core Web API with an MS SQL Server database back-end

## How To Run Front-end

```bash
cd GologoClient
npm install
ng serve
```

Default server location is `http://localhost:4200`

Easy, right?

## How To Run Back-end

Install MS SQL Server and create a database called "Gologo"

Create a table called `PlayerScores` with the following columns:
- PlayerScoreId (int, primary key, identity)
- Name (nvarchar(50), not null)
- ShotsFired (int, not null)
- EnemiesKilled (int, not null)

Create a view called `Top10Scores` with the following query:
```sql
SELECT TOP (10) 
    PlayerScoreId, 
    Name, 
    ShotsFired, 
    EnemiesKilled, 
    EnemiesKilled / (ShotsFired * 1.0) AS Accuracy
FROM dbo.PlayerScores
ORDER BY Accuracy DESC
```

Run the ASP.Net back-end by opening the solution in Visual Studio and pressing F5

If successful, Swagger documentation should open automatically in a new browser window
