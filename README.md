App- URL: https://mentor-stud-assign.herokuapp.com/

Endpoints:

Creating Mentors:- Use the following endpoint to create a new mentor. An example data schema is given below. `Endpoint: /create-mentor`
Example data schema: `{
        name: "Karthick",
        email: "karthick@gmail.com",
        phone: "2345678734567",
        course: "JavaScript",
        students: []
    }`



Creating Students:- Use the following endpoint to create a new student. An example data schema is given below. `Endpoint: /create-student`
Example data schema: `{
        name: "Arun",
        email: "arun@gmail.com",
        phone: "123234534",
        mentor: "",
    }`



Assign a student to a Mentor:- Use the following endpoint to Assign a student to a Mentor. An example data schema is given below. `Endpoint: /assign-student`
Example data schema: `{
         "mentorName":"Rashika",
    "studentName": "Prakash"
    }`
  
  
  
Change the Mentor of a Student:- Use the following endpoint to Change the Mentor of a Student. An example data schema is given below. `Endpoint: /change-mentor`
Example data schema: `{
         "studentName": "Prakash",
    "mentorName":"Ashwin"
    }`
    
    
show all students for a particular mentor:- Use the following endpoint to Change the Mentor of a Student. An example data schema is given below. `Endpoint: /students-of-mentor`
Example data schema: `{
        "mentorName": "Rashika"
    }`
    
    
Students without mentors:- Use the following endpoint to get all Students without mentors. `Endpoint: /no-mentor`



