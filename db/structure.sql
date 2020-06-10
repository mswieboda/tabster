--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: artists; Type: TABLE; Schema: public; Owner: tabster
--

CREATE TABLE public.artists (
    id integer NOT NULL,
    name character varying(254) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.artists OWNER TO tabster;

--
-- Name: artists_id_seq; Type: SEQUENCE; Schema: public; Owner: tabster
--

CREATE SEQUENCE public.artists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.artists_id_seq OWNER TO tabster;

--
-- Name: artists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tabster
--

ALTER SEQUENCE public.artists_id_seq OWNED BY public.artists.id;


--
-- Name: migration_versions; Type: TABLE; Schema: public; Owner: tabster
--

CREATE TABLE public.migration_versions (
    id integer NOT NULL,
    version character varying(17) NOT NULL
);


ALTER TABLE public.migration_versions OWNER TO tabster;

--
-- Name: migration_versions_id_seq; Type: SEQUENCE; Schema: public; Owner: tabster
--

CREATE SEQUENCE public.migration_versions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migration_versions_id_seq OWNER TO tabster;

--
-- Name: migration_versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tabster
--

ALTER SEQUENCE public.migration_versions_id_seq OWNED BY public.migration_versions.id;


--
-- Name: tabs; Type: TABLE; Schema: public; Owner: tabster
--

CREATE TABLE public.tabs (
    id integer NOT NULL,
    title character varying(254) NOT NULL,
    artist_id integer,
    tab text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.tabs OWNER TO tabster;

--
-- Name: tabs_id_seq; Type: SEQUENCE; Schema: public; Owner: tabster
--

CREATE SEQUENCE public.tabs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tabs_id_seq OWNER TO tabster;

--
-- Name: tabs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tabster
--

ALTER SEQUENCE public.tabs_id_seq OWNED BY public.tabs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tabster
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(254) NOT NULL,
    username character varying(254) NOT NULL,
    password_digest character varying(254) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    email_confirmation_token character varying(254) DEFAULT ''::character varying NOT NULL,
    email_confirmed_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO tabster;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tabster
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tabster;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tabster
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: artists id; Type: DEFAULT; Schema: public; Owner: tabster
--

ALTER TABLE ONLY public.artists ALTER COLUMN id SET DEFAULT nextval('public.artists_id_seq'::regclass);


--
-- Name: migration_versions id; Type: DEFAULT; Schema: public; Owner: tabster
--

ALTER TABLE ONLY public.migration_versions ALTER COLUMN id SET DEFAULT nextval('public.migration_versions_id_seq'::regclass);


--
-- Name: tabs id; Type: DEFAULT; Schema: public; Owner: tabster
--

ALTER TABLE ONLY public.tabs ALTER COLUMN id SET DEFAULT nextval('public.tabs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tabster
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: tabster
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- Name: migration_versions migration_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: tabster
--

ALTER TABLE ONLY public.migration_versions
    ADD CONSTRAINT migration_versions_pkey PRIMARY KEY (id);


--
-- Name: tabs tabs_pkey; Type: CONSTRAINT; Schema: public; Owner: tabster
--

ALTER TABLE ONLY public.tabs
    ADD CONSTRAINT tabs_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tabster
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: tabs fk_cr_647009562c; Type: FK CONSTRAINT; Schema: public; Owner: tabster
--

ALTER TABLE ONLY public.tabs
    ADD CONSTRAINT fk_cr_647009562c FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

