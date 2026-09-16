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






