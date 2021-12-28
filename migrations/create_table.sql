-- ADDRESS TABLE
DROP TABLE IF EXISTS public.address CASCADE;
CREATE TABLE IF NOT EXISTS public.address
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer NOT NULL,
    full_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    pincode integer NOT NULL,
    house_no character varying(100) COLLATE pg_catalog."default" NOT NULL,
    area character varying(100) COLLATE pg_catalog."default" NOT NULL,
    city character varying(20) COLLATE pg_catalog."default" NOT NULL,
    state character varying(20) COLLATE pg_catalog."default" NOT NULL,
    landmark character varying(20) COLLATE pg_catalog."default" NOT NULL,
    latitude numeric(20,16) NOT NULL,
    longitude numeric(20,16) NOT NULL,
    country_code character varying(10) COLLATE pg_catalog."default" NOT NULL,
    mobile_number character varying(10) COLLATE pg_catalog."default" NOT NULL,
    is_deleted integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT address_pkey PRIMARY KEY (id)
);

-- ADMIN TABLE
DROP TABLE IF EXISTS public.admin CASCADE;
CREATE TABLE IF NOT EXISTS public.admin
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    email character varying(128) COLLATE pg_catalog."default",
    password character varying(128) COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT admin_pkey PRIMARY KEY (id)
);

-- CATEGORIES TABLE
DROP TABLE IF EXISTS public.categories CASCADE;
CREATE TABLE IF NOT EXISTS public.categories
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    image_id integer NOT NULL,
    is_sub_category integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    is_active integer DEFAULT 0,
    is_deleted integer DEFAULT 0,
    CONSTRAINT categories_pkey PRIMARY KEY (id)
);

-- IMAGE TABLE
DROP TABLE IF EXISTS public.image CASCADE;
CREATE TABLE IF NOT EXISTS public.image
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    url character varying(256) COLLATE pg_catalog."default" NOT NULL,
    type character varying(128) COLLATE pg_catalog."default" NOT NULL,
    is_deleted integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT image_pkey PRIMARY KEY (id)
);

-- MEASURING_UNITS TABLE
DROP TABLE IF EXISTS public.measuring_units CASCADE;
CREATE TABLE IF NOT EXISTS public.measuring_units
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    measuring_type character varying(20) COLLATE pg_catalog."default" NOT NULL,
    symbol character varying(20) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    is_active integer DEFAULT 1,
    is_deleted integer DEFAULT 0,
    CONSTRAINT measuring_units_pkey PRIMARY KEY (id)
);

-- ORDER_PRODUCTS TABLE
DROP TABLE IF EXISTS public.order_products CASCADE;
CREATE TABLE IF NOT EXISTS public.order_products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    product_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    product_image character varying(255) COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    price numeric NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT order_products_pkey PRIMARY KEY (id)
);

-- ORDERS TABLE
DROP TABLE IF EXISTS public.orders CASCADE;
CREATE TABLE IF NOT EXISTS public.orders
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    order_number character varying(20) COLLATE pg_catalog."default",
    user_id integer NOT NULL,
    status integer NOT NULL,
    delivery_charges numeric(20,2) NOT NULL,
    payment_method integer NOT NULL,
    amount numeric(20,2) NOT NULL,
    net_amount numeric(20,2),
    user_address integer NOT NULL,
    delivery_date date,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    payment_id character(30) COLLATE pg_catalog."default",
    CONSTRAINT orders_pkey PRIMARY KEY (id)
);

-- PRODUCT_HISTORY TABLE
DROP TABLE IF EXISTS public.product_history CASCADE;
CREATE TABLE IF NOT EXISTS public.product_history
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    is_deleted integer DEFAULT 0,
    view_count integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT product_history_pkey PRIMARY KEY (id)
);

-- PRODUCT_PRICE TABLE
DROP TABLE IF EXISTS public.product_price CASCADE;
CREATE TABLE IF NOT EXISTS public.product_price
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_id integer NOT NULL,
    actual_price integer NOT NULL,
    discount integer,
    discount_start_date timestamp without time zone,
    discount_end_date timestamp without time zone,
    discount_type character varying(128) COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT product_price_pkey PRIMARY KEY (id)
);

--PRODUCT_REVIEW TABLE
DROP TABLE IF EXISTS public.product_review CASCADE;
CREATE TABLE IF NOT EXISTS public.product_review
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    headline text COLLATE pg_catalog."default" NOT NULL,
    opinion text COLLATE pg_catalog."default" NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    is_deleted integer DEFAULT 0,
    ratings integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    order_id integer NOT NULL,
    CONSTRAINT product_review_pkey PRIMARY KEY (id)
);

--PRODUCTS TABLE
DROP TABLE IF EXISTS public.products CASCADE;
CREATE TABLE IF NOT EXISTS public.products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    image_id integer NOT NULL,
    category_id integer NOT NULL,
    sub_category_id integer,
    max_quantity integer NOT NULL,
    purchase_limit integer NOT NULL,
    measuring_unit_id integer,
    description text COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    is_active integer NOT NULL DEFAULT 1,
    is_deleted integer DEFAULT 0,
    CONSTRAINT products_pkey PRIMARY KEY (id)
);

--SETTINGS TABLE
DROP TABLE IF EXISTS public.settings CASCADE;
CREATE TABLE IF NOT EXISTS public.settings
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    settings_key character varying(256) COLLATE pg_catalog."default" NOT NULL,
    settings_value character varying(256) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT settings_pkey PRIMARY KEY (id)
);

--SUB_CATEGORIES TABLE
DROP TABLE IF EXISTS public.sub_categories CASCADE;
CREATE TABLE IF NOT EXISTS public.sub_categories
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    image_id integer NOT NULL,
    category_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    is_deleted integer DEFAULT 0,
    is_active integer DEFAULT 1,
    CONSTRAINT sub_categories_pkey PRIMARY KEY (id)
);

--USERS TABLE
DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    country_code character varying(255) COLLATE pg_catalog."default" NOT NULL,
    mobile_number character varying(255) COLLATE pg_catalog."default" NOT NULL,
    type character varying(255) COLLATE pg_catalog."default" NOT NULL,
    is_active integer DEFAULT 1,
    otp character varying(255) COLLATE pg_catalog."default",
    otp_validity timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    fcm_token character varying(255) COLLATE pg_catalog."default",
    profile_image character varying(255) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

--USER_PAYMENT TABLE
DROP TABLE IF EXISTS public.user_payments CASCADE;
CREATE TABLE IF NOT EXISTS public.user_payments
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    payment_order_id character varying COLLATE pg_catalog."default" NOT NULL,
    payment_id character varying COLLATE pg_catalog."default" UNIQUE NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    status integer,
    card_number character varying COLLATE pg_catalog."default" NOT NULL,
    card_type character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_payment_pkey PRIMARY KEY (id)
);

--WISHLIST TABLE
DROP TABLE IF EXISTS public.wishlist CASCADE;
CREATE TABLE IF NOT EXISTS public.wishlist
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    is_deleted integer NOT NULL DEFAULT 0,
    created_at timestamp without time zone NOT NULL,
    CONSTRAINT wishlist_pkey PRIMARY KEY (id)
);