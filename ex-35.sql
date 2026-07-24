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



