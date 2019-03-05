create database bamazon;
use bamazon;

create table products(
	item_id int not null auto_increment,
    product_name varchar(100),
    department_name varchar(100),
    price decimal(10, 2) not null,
    stock_quantity int not null,
    primary key(item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values("Snake Plant", "Outdoor & Gardening", 12, 100), 
("Brass Mister", "Outdoor & Gardening", 24, 500), 
("Neon Pothos", "Outdoor & Gardening", 10, 250), 
("Coffee Table", "Furniture", 180, 75), 
("Pendant Light", "Lighting", 35, 100),
("Moon Night Light", "Lighting", 8, 300), 
("Industrial Clothing Rack", "Furniture", 89, 50), 
("Espresso Machine", "Kitchen", 2000, 100), 
("Cappucino Mug", "Kitchen", 5, 500),
("Catnip", "Pet Supplies", 3, 400);

select * from products; 