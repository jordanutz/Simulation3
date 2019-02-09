create table users (
  id serial primary key,
  auth0_id text not null,
  username text not null,
  email text not null,
  photo text unique not null
)

select * from posts 
