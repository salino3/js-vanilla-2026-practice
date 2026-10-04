-- https://www.sql-practice.com/

SELECT contact_name, address, city from customers where country NOT IN ('Germany', 'Mexico', 'Spain');

-- Show the employee_id, order_id, customer_id, required_date, shipped_date from all orders shipped later than the required date
SELECT employee_id, order_id, customer_id, required_date, shipped_date
FROM orders
WHERE shipped_date > required_date;

-- Show all the even numbered Order_id from the orders table
 select   order_id from orders where order_id % 2 = 0 ;
-- Or
SELECT order_id
FROM orders
WHERE mod(order_id,2) = 0;

-- Show the city, company_name, contact_name of all customers from cities which contains the letter 'L' in the city name, sorted by contact_name
SELECT city, company_name, contact_name
FROM customers
WHERE city LIKE '%L%'
ORDER BY contact_name

--
 SELECT   company_name, contact_name, fax  from customers where fax not  null;
 
 -- Show the first_name, last_name. hire_date of the most recently hired employee.
select  MAX(hire_date),  first_name, last_name  from employees    limit 1 ;

-- Show the average unit price rounded to 2 decimal places, the total units in stock, total discontinued products from the products table.
 select  ROUND(AVG(unit_price),  2) AS average_price, -- declare name column
   sum(units_in_stock) AS total_stock ,
  sum(discontinued) AS total_discontinued
    from products ;

--
SELECT order_date, shipped_date, customer_id , freight from orders where   order_date = '2016-02-26' ;

-- It show off a table with a column 'source_type' 
-- declaring from what table it comes from
SELECT 
    city, 
    company_name, 
    contact_name, 
    'contacts' AS source_type
FROM customers

UNION

SELECT 
    city, 
    company_name, 
    contact_name, 
    'suppliers' AS source_type
FROM suppliers;

-- Find the total amount spent by each customer who has made at least one 'Completed' order.
select   u.name,  SUM(o.total_amount) as total_amount from users u
join orders o ON u.id = o.user_id 
 where  o.status = 'Completed'
 group by u.name
 order by  total_amount DESC;

--  Find the total quantity sold for every product that has been purchased in a 'Completed' order.
SELECT 
    p.category_id, 
    p.name, 
    SUM(oi.quantity) AS quantity 
FROM products p 
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON o.id = oi.order_id 
WHERE o.status = 'Completed'
GROUP BY p.category_id, p.name
ORDER BY quantity DESC;

