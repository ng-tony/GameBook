create view total_likes as 
    select games.gameID, count(*) as x from likes join games on games.gameID = likes.gameID
        group by games.gameID
        order by x DESC;


create view popularity as
select gameID, x, (select count(*) from total_likes b  where a.x <= b.x) as ranking
from total_likes a;