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
