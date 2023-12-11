# vitality
Used for vitality squares project

Home page:
The # in the first text box is updated based on the number of inputs in the DB
Add my squares is a button that links to the second page
The boxes represent the vitality squares. 
•	The 8 highest will be fruit. 
•	The rest will be junk.
•	Can include a percentage or probability that a given square will be chosen 
•	On the back end, can use that probability to determine the image just to make it a little more interesting.


New Squares Page:
Home button up top
1 fillable form
•	Name : required
o	Is text. 
o	Does not allow any weird characters…just the standard ascii letters…no numbers. 
o	It will convert to all caps or lowercase for ease.
•	Month : required
o	Dropdown to select month.
•	Year : required
o	Dropdown to select year.
•	Squares : required
o	Would like so that 8 have to be selected
o	It is a checkbox table
o	would be cool if all of the boxes were junk food, and when you clicked (checked) it became fruit
•	submit button
o	When you submit, it will store the results in the database. 
o	It should run a check to see if the person has already submit this form
	Do that by storing a check table where a string is stored “NameMonthYear” so that we can check the DB 


The DB:

3 tables:
1.	Heat map
a.	15 columns to store the values. Each location will be given some name. 
b.	There is 1 row
c.	All columns are ints
2.	Check table
a.	1 column that is a varchar(50)
3.	Stored submissions
a.	Columns
i.	Name: varchar
ii.	Month: varchar
iii.	Year: int
iv.	A column for each square : Boolean?
![image](https://github.com/austing22/vitality/assets/59540228/42294894-d3d8-49f5-b4db-1c9c805080d5)

