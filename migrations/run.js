import pg from 'pg';
import fs from 'fs';
import products from './products.json';

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
	await insertMeasurentData();
	await insertCategoryData();
	await insertSubCategoriesData();
	await insertProductsData();
	await insertSettingsData();
	console.log('DATA migrated successfully');

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

async function insertSettingsData() {
	let settings = [
		{ settingsKey: 'smtpHost' },
		{ settingsKey: 'smtpPort' },
		{ settingsKey: 'smtpEmail' },
		{ settingsKey: 'smtpPassword' },
		{ settingsKey: 'smtpService' },
		{ settingsKey: 'razorpaykey' },
		{ settingsKey: 'razorpaySecret' },
		{ settingsKey: 'fcmServerKey' },
		{ settingsKey: '' },
	];

	for (const { settingsKey } of settings) {
		await client.query(
			'INSERT INTO public.settings(settings_key, settings_value) VALUES ($1, $2);',
			[settingsKey, null]
		);
	}
}

async function insertMeasurentData() {
	let measurentData = [
		{ measuring_type: 'Kilogram', symbol: 'Kg' },
		{ measuring_type: 'Dozen', symbol: 'dz' },
		{ measuring_type: 'Unit', symbol: 'un' },
		{ measuring_type: 'Litres', symbol: 'L' },
	];

	for (const { measuring_type, symbol } of measurentData) {
		await client.query(
			'INSERT INTO public.measuring_units(measuring_type, symbol, is_active) VALUES ($1, $2, $3);',
			[measuring_type, symbol, 1]
		);
	}
}

async function insertSubCategoriesData() {
	let subCategoryData = [
		{
			id: 1,
			name: 'Fruits',
			categoryId: 1,
			image:
				'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature_thumb.jpg?sfvrsn=7abe71fe_4',
			is_active: 0,
		},
		{
			id: 2,
			name: 'Vegetables',
			categoryId: 1,
			image:
				'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg?crop=0.669xw:1.00xh;0.300xw,0&resize=640:*',
			is_active: 1,
		},
		{
			id: 3,
			name: 'Dry Fruits',
			categoryId: 1,
			image:
				'https://www.nutfruit.org/images/noticia/1597227233-nuts-and-dried-fruits2.jpeg',
			is_active: 1,
		},
		{
			id: 4,
			name: 'Cheese',
			categoryId: 3,
			image:
				'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthiest-cheese-1296x728-swiss.jpg?w=1155&h=1528',
			is_deleted: 0,
			is_active: 1,
		},
		{
			id: 5,
			name: 'Milk',
			categoryId: 3,
			image: 'https://ychef.files.bbci.co.uk/976x549/p08vpmjp.jpg',
			is_deleted: 0,
			is_active: 1,
		},
		{
			id: 6,
			name: 'Butter',
			categoryId: 3,
			image:
				'https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/04/butter-curls-1296x728-header.jpg?w=1155&h=1528',
			is_deleted: 0,
			is_active: 1,
		},
		{
			id: 7,
			name: 'Detergents',
			categoryId: 6,
			image:
				'https://cdn.thewirecutter.com/wp-content/uploads/2020/06/laundrydetergent-lowres-2x1-6429-1024x512.jpg',
			is_deleted: 0,
			is_active: 1,
		},
		{
			id: 8,
			name: 'Cleaners',
			categoryId: 6,
			image:
				'https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/743/cached.offlinehbpl.hbpl.co.uk/news/OMC/988EAC9D-00F5-EEE9-6A89B0F36DBAF81C.jpg',
			is_deleted: 0,
			is_active: 1,
		},
		{
			id: 9,
			name: 'Repellents',
			categoryId: 6,
			image:
				'https://cdn.thewirecutter.com/wp-content/uploads/2019/03/bug-repellent-lowres-9669.jpg',
			is_deleted: 0,
			is_active: 1,
		},
		{
			id: 10,
			name: 'Disinfectants',
			categoryId: 6,
			image:
				'https://static.straitstimes.com.sg/s3fs-public/articles/2020/04/26/dw-us-disinfectant-covid19-200426.jpg',
			is_deleted: 0,
			is_active: 1,
		},
		{
			id: 11,
			name: 'Noodles',
			categoryId: 7,
			image:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mama_instant_noodle_block.jpg/1200px-Mama_instant_noodle_block.jpg',
			is_deleted: 0,
			is_active: 0,
		},
		{
			id: 12,
			name: 'Pickles',
			categoryId: 7,
			image:
				'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325124_2200-732x549.jpg',
			is_deleted: 0,
			is_active: 0,
		},
		{
			id: 13,
			name: 'Frozen food',
			categoryId: 7,
			image:
				'https://res.cloudinary.com/purnesh/image/upload/f_auto/v1500453023/modern-bazaar002.jpg',
			is_deleted: 0,
			is_active: 0,
		},
		{
			id: 14,
			name: 'Readymade meals',
			categoryId: 7,
			image:
				'https://www.naturalproductsinsider.com/sites/naturalproductsinsider.com/files/10_16_Personalized%20Ready%20Meals.jpg',
			is_deleted: 0,
			is_active: 1,
		},
	];

	for (const { id, name, categoryId, image, is_active } of subCategoryData) {
		const newImage = await client.query(
			'INSERT INTO public.image(name, url, type) VALUES ($1, $2, $3) RETURNING id;',
			['sub_category_image', image, 'sub_category']
		);
		await client.query(
			'INSERT INTO public.sub_categories(name, image_id, category_id, is_active) VALUES ($1, $2, $3, $4);',
			[name, newImage.rows[0].id, categoryId, is_active]
		);
	}
}

const randomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function insertProductsData() {
	for (const {
		name,
		image,
		category_id,
		sub_category_id,
		measuring_unit_id,
	} of products) {
		try {
			const newImage = await client.query(
				'INSERT INTO public.image(name, url, type) VALUES ($1, $2, $3) RETURNING id;',
				['product_image', image, 'product']
			);

			const newProduct = await client.query(
				'INSERT INTO public.products(name, image_id, category_id, sub_category_id, max_quantity, purchase_limit, measuring_unit_id, description, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;',
				[
					name,
					newImage.rows[0].id,
					category_id,
					sub_category_id,
					randomNumber(300, 600),
					randomNumber(1, 5),
					measuring_unit_id,
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra nibh quis eros eleifend, vel commodo augue fermentum. Nunc justo lectus, scelerisque quis pretium in, interdum ac felis. Nulla facilisi. Aenean rutrum luctus massa sit amet fringilla. Duis porttitor elit feugiat, convallis nunc a, faucibus justo. Vestibulum sed arcu felis.',
					1,
				]
			);

			await client.query(
				'INSERT INTO public.product_price(product_id, actual_price, discount, discount_start_date, discount_end_date, discount_type) VALUES ($1, $2, $3, $4, $5, $6);',
				[newProduct.rows[0].id, randomNumber(100, 1500), null, null, null, null]
			);
		} catch (err) {
			console.log('>>>>>>>data', {
				name,
				image,
				category_id,
				sub_category_id,
				measuring_unit_id,
			});
			console.log('>>>>>>>error', err);
			break;
		}
	}
}
