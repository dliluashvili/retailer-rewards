create table users
(
    id         serial
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    firstname  varchar                 not null,
    lastname   varchar                 not null,
    email      varchar                 not null
        constraint "UQ_97672ac88f789774dd47f7c8be3"
            unique,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null,
    point      integer   default 0     not null
);

alter table users
    owner to postgres;

