create table monthly_report
(
    id      serial
        constraint "PK_fe8b38d177d9ee8af29e9d970e9"
            primary key,
    date    timestamp not null,
    point   integer   not null,
    user_id integer   not null
        constraint "FK_bb688bbaf05065b39b1822c82c1"
            references users
            on delete cascade,
    quarter integer   not null
);

alter table monthly_report
    owner to postgres;