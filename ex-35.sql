-- https://www.sql-practice.com/

-- Show first name, last name, and gender of patients whose gender is 'M'
select first_name, last_name, gender from patients where gender = "M";

-- Show first name and last name of patients who does not have allergies. (null)
select first_name, last_name FROM patients Where allergies IS null;

-- Show first name of patients that start with the letter 'C'
select first_name from patients where first_name like 'C%';


