import pg from 'pg';
import fs from 'fs';
import path from 'path';

var connectionString =
	'postgres://postgres:admin@localhost:5432/rocket_delivery_temp';
let create_table_sql = fs
	.readFileSync('migrations/create_table.sql')
	.toString();
let alter_table_sql = fs.readFileSync('migrations/alter_table.sql').toString();

const client = new pg.Client(connectionString);

client.connect().then(async (err, res) => {
	await client.query(create_table_sql);
	console.log('TABLE added successfully');
	await client.query(alter_table_sql);
	console.log('FOREIGN KEYS added successfully');

	await insertAdminData();
	await insertCategoryData();

	client.end();
});

async function insertAdminData() {
	let adminData = {
		email: 'rocketAdmin@yopmail.com',
		password: '$2a$10$tq4elPS71HrhQd.x5bOCHuTr9yjJWBKFN9xNv2HCqC7R6ZWUBPqwK',
	};

	await client.query(
		`INSERT INTO public.admin(email, password) VALUES ('${adminData.email}', '${adminData.password}');`,
		[]
	);
}

async function insertCategoryData() {
	let categoryData = [
		{
			is_active: 1,
			name: 'Fruits & Vegetables',
			is_sub_category: 1,
			image:
				'https://www.lalpathlabs.com/blog/wp-content/uploads/2019/01/Fruits-and-Vegetables.jpg',
		},
		{
			is_active: 1,
			name: 'Non Veg',
			is_sub_category: 1,
			image:
				'https://indialovesbest.in/wp-content/uploads/2021/03/How-to-Store-Raw-Chicken-in-Fridge-scaled.jpg',
		},
		{
			is_active: 1,
			name: 'Milk & Dairy',
			is_sub_category: 1,
			image:
				'https://domf5oio6qrcr.cloudfront.net/medialibrary/9685/iStock-544807136.jpg',
		},
		{
			is_active: 1,
			name: 'Spices',
			is_sub_category: 1,
			image:
				'https://www.homestratosphere.com/wp-content/uploads/2019/04/Different-types-of-spices-of-the-table-apr18.jpg',
		},
		{
			is_active: 1,
			name: 'Beverages',
			is_sub_category: 1,
			image:
				'https://c.ndtvimg.com/2021-02/e2uarbeo_juice-_625x300_25_February_21.jpg',
		},
		{
			is_active: 1,
			name: 'House hold',
			is_sub_category: 1,
			image:
				'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/988EAC9D-00F5-EEE9-6A89B0F36DBAF81C.jpg',
		},
		{
			is_active: 0,
			name: 'Instant food',
			is_sub_category: 1,
			image: 'https://www.babycenter.com/ims/2019/05/iStock-643845180_wide.jpg',
		},
	];

	for (const { name, is_active, is_sub_category, image } of categoryData) {
		const newImage = await client.query(
			'INSERT INTO public.image(name, url, type)VALUES ($1, $2, $3) RETURNING id;',
			['category_image', image, 'category']
		);
		const newCategory = await client.query(
			`INSERT INTO public.categories(name, image_id, is_sub_category, is_active) VALUES ($1, $2, $3, $4) RETURNING id;`,
			[name, newImage.rows[0].id, is_active, is_sub_category]
		);
	}
}
