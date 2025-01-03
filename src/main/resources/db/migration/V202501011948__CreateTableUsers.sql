create table users (
    id bigserial primary key,
    login text not null,
    password text not null,
    img_src text
)