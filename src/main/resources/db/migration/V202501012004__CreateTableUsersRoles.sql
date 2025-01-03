create table users_roles (
    id bigserial primary key,
    user_id bigint references users(id) not null,
    role text references roles(name) not null
)