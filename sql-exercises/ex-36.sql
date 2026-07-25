-- https://www.sql-practice.com/

-- Show unique birth years from patients and order them by ascending.
select  distinct  year(birth_date) from patients order by year(birth_date) ASC ;
-- or
SELECT year(birth_date) FROM patients GROUP BY year(birth_date)


-- Show the ProductName, CompanyName, CategoryName from the products, suppliers, and categories table
SELECT p.product_name, s.company_name, c.category_name
FROM products p
JOIN suppliers s ON s.supplier_id = p.Supplier_id
JOIN categories c On c.category_id = p.Category_id;

-- Show the category_name and the average product unit price for each 
-- category rounded to 2 decimal places.
select c.category_name, round(Avg(p.unit_price), 2)  as average_unit_price from products p 
join categories c  on  p.category_id =  c.category_id  GROUP BY c.category_name; 


-- Show the city, company_name, contact_name from the customers and suppliers table merged together.
-- Create a column which contains 'customers' or 'suppliers' depending on the table it came from.
SELECT 
    city, 
    company_name, 
    contact_name, 
    'customers' AS source_type
FROM customers
 UNION
  SELECT 
    city, 
    company_name, 
    contact_name, 
    'suppliers' AS source_type
FROM suppliers; -- Ordered by SQL

-- Show the total amount of orders for each year/month.
select 
--@ Three different manners for adding unique value in the tables
-- PRINTF('%d-%02d', YEAR(order_date), MONTH(order_date)) AS row_id,
-- ROW_NUMBER() OVER (ORDER BY YEAR(order_date), MONTH(order_date)) AS row_id,
-- CAST(ROW_NUMBER() OVER (ORDER BY YEAR(order_date), MONTH(order_date)) AS TEXT) AS row_id,
year(order_date) as order_year,
  month(order_date) as order_month,
  count(*) as no_of_orders
from orders
group by order_year, order_month;
