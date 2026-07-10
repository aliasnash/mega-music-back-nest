-- Table: public.category

-- DROP TABLE IF EXISTS public.category;

CREATE TABLE IF NOT EXISTS public.category
(
    id integer NOT NULL DEFAULT nextval('category_id_seq'::regclass),
    caption character varying(64) COLLATE pg_catalog."default",
    sortby integer DEFAULT 0,
    CONSTRAINT category_pkey PRIMARY KEY (id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.category
    OWNER to postgres;

-- Table: public.content

-- DROP TABLE IF EXISTS public.content;

CREATE TABLE IF NOT EXISTS public.content
(
    id integer NOT NULL DEFAULT nextval('content_id_seq'::regclass),
    songer character varying(128) COLLATE pg_catalog."default",
    title character varying(128) COLLATE pg_catalog."default",
    author_w character varying(128) COLLATE pg_catalog."default",
    author_m character varying(128) COLLATE pg_catalog."default",
    album character varying(128) COLLATE pg_catalog."default",
    audio_file_path character varying(128) COLLATE pg_catalog."default",
    cover_file_path character varying(128) COLLATE pg_catalog."default",
    expired_date date,
    active boolean DEFAULT false,
    idcategory integer,
    CONSTRAINT content_pkey PRIMARY KEY (id),
    CONSTRAINT content_idcategory_fkey FOREIGN KEY (idcategory)
    REFERENCES public.category (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION
    NOT VALID
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.content
    OWNER to postgres;
-- Index: idx_content_active_category

-- DROP INDEX IF EXISTS public.idx_content_active_category;

CREATE INDEX IF NOT EXISTS idx_content_active_category
    ON public.content USING btree
    (active ASC NULLS LAST, idcategory ASC NULLS LAST, songer COLLATE pg_catalog."default" ASC NULLS LAST, cover_file_path COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.playlist_system

-- DROP TABLE IF EXISTS public.playlist_system;

CREATE TABLE IF NOT EXISTS public.playlist_system
(
    id bigint NOT NULL DEFAULT nextval('playlist_system_id_seq'::regclass),
    idcontent integer DEFAULT 0,
    idtop integer DEFAULT 0,
    "position" integer DEFAULT 0,
    CONSTRAINT playlist_system_pkey PRIMARY KEY (id),
    CONSTRAINT playlist_system_idcontent_fkey FOREIGN KEY (idcontent)
    REFERENCES public.content (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID,
    CONSTRAINT playlist_system_idtop_fkey FOREIGN KEY (idtop)
    REFERENCES public.tops (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.playlist_system
    OWNER to postgres;

-- Table: public.playlist_user

-- DROP TABLE IF EXISTS public.playlist_user;

CREATE TABLE IF NOT EXISTS public.playlist_user
(
    id bigint NOT NULL DEFAULT nextval('playlist_user_id_seq'::regclass),
    msisdn character varying(16) COLLATE pg_catalog."default",
    idcontent integer DEFAULT 0,
    dateadded timestamp without time zone DEFAULT now(),
    channel integer DEFAULT 0,
    CONSTRAINT playlist_user_pkey PRIMARY KEY (id),
    CONSTRAINT playlist_user_idcontent_fkey FOREIGN KEY (idcontent)
    REFERENCES public.content (id) MATCH SIMPLE
                        ON UPDATE CASCADE
                        ON DELETE CASCADE
    NOT VALID
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.playlist_user
    OWNER to postgres;

-- Table: public.tops

-- DROP TABLE IF EXISTS public.tops;

CREATE TABLE IF NOT EXISTS public.tops
(
    id integer NOT NULL DEFAULT nextval('tops_id_seq'::regclass),
    title character varying(128) COLLATE pg_catalog."default",
    cover_path character varying(128) COLLATE pg_catalog."default",
    web_available boolean DEFAULT false,
    description character varying(128) COLLATE pg_catalog."default",
    CONSTRAINT tops_pkey PRIMARY KEY (id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tops
    OWNER to postgres;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    msisdn character varying(16) COLLATE pg_catalog."default",
    dateadded timestamp without time zone DEFAULT now(),
    channel integer DEFAULT 0,
    ispayed boolean DEFAULT false,
    datenextpay timestamp without time zone,
    payerrorcounter integer DEFAULT 0,
    paylockmarker bigint DEFAULT 0,
    idoperator integer DEFAULT 0,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_msisdn_key UNIQUE (msisdn)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table: public.users_history

-- DROP TABLE IF EXISTS public.users_history;

CREATE TABLE IF NOT EXISTS public.users_history
(
    id bigint NOT NULL DEFAULT nextval('users_history_id_seq'::regclass),
    msisdn character varying(16) COLLATE pg_catalog."default",
    dateadded timestamp without time zone DEFAULT now(),
    useraction integer DEFAULT 0,
    information text COLLATE pg_catalog."default",
    offreason integer DEFAULT 0,
    CONSTRAINT users_history_pkey PRIMARY KEY (id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users_history
    OWNER to postgres;

COMMENT ON COLUMN public.users_history.useraction
    IS '
1 - subscribe
2 - unsubscribe
3 - add service
4 - remove service';

COMMENT ON COLUMN public.users_history.offreason
    IS '
1 - self unsubscribe
2 - unsubscribe because of no money while payment
3 - unsubscribe because of another error while payment
4 - unsubscribe through CMS';
