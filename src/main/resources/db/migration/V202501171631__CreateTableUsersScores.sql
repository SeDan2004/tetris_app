create table users_scores(
  id bigserial primary key,
  user_id integer references users(id) not null,
  score integer
);