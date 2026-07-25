-- https://www.sql-practice.com/

-- Show first name, last name, and gender of patients whose gender is 'M'
select first_name, last_name, gender from patients where gender = "M";

-- Show first name and last name of patients who does not have allergies. (null)
select first_name, last_name FROM patients Where allergies IS null;

-- Show first name of patients that start with the letter 'C'
select first_name from patients where first_name like 'C%';

-- Show first name and last name of patients that weight within the range of 100 to 120 (inclusive)
select first_name, last_name from patients where weight between 100 AND 120;

-- Update the patients table for the allergies column. If the patient's allergies is null then replace it with 'NKA'
UPDATE patients SET allergies = 'NKA' WHERE allergies IS null;

-- Show first name and last name concatinated into one column to show their full name.
SELECT CONCAT ( first_name ,   ' ', last_name ) AS full_name from patients;

-- Show first name, last name, and the full province name of each patient.
SELECT 
  first_name,     
  last_name,       
  province_name     
FROM patients 
JOIN province_names ON province_names.province_id = patients.province_id;

-- Show how many patients have a birth_date with 2010 as the birth year.
SELECT COUNT(*) AS total_patients
FROM patients
WHERE YEAR(birth_date) = 2010;

-- Show the first_name, last_name, and height of the patient with the greatest height.
SELECT first_name, last_name, MAX(height) AS height FROM  patients;  

-- Show all columns for patients who have one of the following patient_ids: 1,45,534,879,1000
select * from patients where patient_id IN (1,45,534,879,1000);

-- Show the total number of admissions
select count(*) from admissions;

-- Show all the columns from admissions where the patient was admitted and discharged on the same day.
select * from admissions where admission_date is discharge_date;
-- * THIS BETTER  
select * from admissions where admission_date = discharge_date;

-- Show the patient id and the total number of admissions for patient_id 579.
select  patients.patient_id, COUNT(*) AS total_admissions from patients 
join admissions on patients.patient_id = admissions.patient_id 
 where patients.patient_id = 579;

-- Based on the cities that our patients live in, show unique cities that are 
-- in province_id 'NS'.
SELECT DISTINCT patients.city 
FROM patients
JOIN province_names ON patients.province_id = province_names.province_id
WHERE province_names.province_id = 'NS';

-- Write a query to find the first_name, last name and birth date of patients
--  who has height greater than 160 and weight greater than 70
select first_name, last_name, birth_date from patients where height > 160 AND weight > 70;


-- Write a query to find list of patients first_name, last_name, and allergies where 
-- allergies are not null and are from the city of 'Hamilton'
select first_name, last_name, allergies from patients Where allergies 
IS not NULL and city = 'Hamilton';

-- example of more complex query
SELECT 
  patients.first_name, 
  patients.last_name, 
  patients.allergies 
FROM patients
JOIN province_names ON patients.province_id = province_names.province_id
WHERE patients.allergies IS NOT NULL 
  AND patients.city = 'Hamilton'
  AND province_names.province_id = 'ON'; -- Or whatever province_id you want