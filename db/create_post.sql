insert into posts
  (user_id, title, image, content)
  values
  ($1, $2, $3, $4)
  returning*;
