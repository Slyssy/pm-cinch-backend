create DATABASE pm_cinch_dev;

USE pm_cinch_dev;

CREATE TABLE users(
id int primary key auto_increment,
first_name varchar(20) NOT NULL,
last_name varchar(20) NOT NULL,
position varchar(20) NOT NULL,
email varchar(50) NOT NULL,
phone varchar(15),
pay_rate float,
user_name varchar(20) NOT NULL UNIQUE,
password_hash varchar(1000) NOT NULL
);

CREATE TABLE projects(
id int primary key auto_increment,
user_id int NOT NULL,
project_name varchar(50) NOT NULL,
street_1 varchar(50) NOT NULL,
street_2 varchar(50),
city varchar(20) NOT NULL,
state char(2) NOT NULL,
zip char(5),
project_status varchar(10) NOT NULL,
project_margin decimal(5, 2),
original_revenue decimal(11, 2),
adjusted_revenue decimal(11, 2),
budgeted_material_expense decimal(11, 2),
budgeted_labor_expense decimal(11, 2),
budgeted_subcontractor_expense decimal(11, 2),
budgeted_miscellaneous_expense decimal(11, 2),
adjusted_material_expense decimal(11, 2),
adjusted_labor_expense decimal(11, 2),
adjusted_subcontractor_expense decimal(11, 2),
adjusted_miscellaneous_expense decimal(11, 2),
actual_material_expense decimal(11, 2),
actual_labor_expense decimal(11, 2),
actual_subcontractor_expense decimal(11, 2),
actual_miscellaneous_expense decimal(11, 2),
estimated_start_date date,
estimated_complete_date date,
actual_start_date date,
actual_complete_date date,
FOREIGN KEY (user_id) references users(id)
);

CREATE TABLE expenses (
id int primary key auto_increment,
project_id int NOT NULL,
expense_date date NOT NULL,
expense_type varchar(20) NOT NULL,
vendor_name varchar(20)  NOT NULL,
expense_amount decimal(11, 2),
FOREIGN KEY (project_id) references projects(id)
);

CREATE TABLE comments (
id int primary key auto_increment,
project_id int NOT NULL,
comment_subject varchar(50) NOT NULL,
comment_description varchar(500) NOT NULL,
comment_date date NOT NULL,
FOREIGN KEY (project_id) references projects(id)
);

CREATE TABLE timesheets (
id int primary key auto_increment,
project_id int NOT NULL,
user_id int NOT NULL,
time_in datetime NOT NULL,
time_lunch_start datetime,
time_lunch_end datetime,
time_out datetime NOT NULL,
FOREIGN KEY (project_id) references projects(id),
FOREIGN KEY (user_id) references users(id)
);

CREATE TABLE tasks (
id int primary key auto_increment,
user_id int NOT NULL,
project_id int NOT NULL,
task_title varchar(100) NOT NULL,
task_description varchar(250) NOT NULL,
task_status varchar(20) NOT NULL,
task_start date,
task_end date,
complete boolean DEFAULT 0,
FOREIGN KEY (project_id) references projects(id),
FOREIGN KEY (user_id) references users(id)
);