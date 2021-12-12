ALTER TABLE address ADD CONSTRAINT fk_address_user FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE sub_categories ADD CONSTRAINT fk_sub_categories_category FOREIGN KEY (category_id) REFERENCES categories (id);

ALTER TABLE products ADD CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id);

ALTER TABLE products ADD CONSTRAINT fk_products_sub_category FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id);

ALTER TABLE products ADD CONSTRAINT fk_products_measuring_unit FOREIGN KEY (measuring_unit_id) REFERENCES measuring_units (id);

ALTER TABLE products ADD CONSTRAINT fk_product_price_products FOREIGN KEY (price_id) REFERENCES product_price (id);

ALTER TABLE product_history ADD CONSTRAINT fk_product_history_products FOREIGN KEY (product_id) REFERENCES products (id);

ALTER TABLE product_history ADD CONSTRAINT fk_products_history_users FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE orders ADD CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE orders ADD CONSTRAINT fk_orders_user_address FOREIGN KEY (user_address) REFERENCES address (id);

ALTER TABLE orders ADD CONSTRAINT fk_products_user_payments FOREIGN KEY (payment_id) REFERENCES user_payments (payment_id);

-- error
-- ALTER TABLE wishlist ADD CONSTRAINT fk_wishlist_products FOREIGN KEY (product_id) REFERENCES products (product_id);

ALTER TABLE wishlist ADD CONSTRAINT fk_wishlist_users FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE product_review ADD CONSTRAINT fk_product_review_users FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE product_review ADD CONSTRAINT fk_product_review_orders FOREIGN KEY (order_id) REFERENCES orders (id);
