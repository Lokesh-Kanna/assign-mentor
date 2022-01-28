import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import {
  addMentor,
  addStudent,
  assignStudent,
  addMentorsToStudents,
  changeMentor,
  addNewStudArr,
  studentsOfMentor,
  showAllMentors,
  showAllStudents,
  studentsWithoutMentor,
} from "./helper.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;

const MONGO_URL = process.env.MONGO_URL;

export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo DB is connected");
  return client;
}
createConnection();

const client = await createConnection();

app.get("/", async (req, res) => {
  res.send({ message: "Welcome to Mentor-Student Assign app" });
});

app.post("/create-mentor", async (req, res) => {
  const data = req.body;
  const addedMentor = await addMentor(data);
  res.send(addedMentor);
});

app.post("/create-student", async (req, res) => {
  const data = req.body;
  const addedStudent = await addStudent(data);
  res.send(addedStudent);
});

app.put("/assign-student", async (req, res) => {
  const data = req.body;
  const allStudents = await showAllStudents();
  var hasMentor = true;
  for (let i = 0; i < allStudents.length; i++) {
    if (
      allStudents[i].name == data.studentName &&
      allStudents[i].mentor == ""
    ) {
      hasMentor = false;
      break;
    }
  }

  if (!hasMentor) {
    await assignStudent(data);
    await addMentorsToStudents(data);
    res.send({
      Message: `Mentor ${data.mentorName} assigned to ${data.studentName}`,
    });
  } else {
    res.send({ Message: "The student already has a mentor" });
  }
});

app.put("/change-mentor", async (req, res) => {
  const data = req.body;
  const allStudents = await showAllStudents();
  const allMentors = await showAllMentors();
  let existingMentor = "";
  let newStudentArr = [];

  const ment = allStudents.filter(
    (student) => student.name == data.studentName && student.mentor
  );
  existingMentor = ment[0].mentor;

  for (let i = 0; i < allMentors.length; i++) {
    if (allMentors[i].name == existingMentor) {
      for (let j = 0; j < allMentors[i].students.length; j++) {
        if (allMentors[i].students[j] != data.studentName) {
          newStudentArr.push(allMentors[i].students[j]);
        }
      }
    }
  }
  await addNewStudArr(newStudentArr);
  console.log(newStudentArr);

  for (let i = 0; i < allStudents.length; i++) {
    if (allStudents[i].name === data.studentName) {
      res.send({
        message: `Mentor changed from ${allStudents[i].mentor} to ${data.mentorName}`,
      });
      const changedMentor = await changeMentor(data);
      await assignStudent(data);
    }
  }
});

app.get("/students-of-mentor", async (req, res) => {
  const mentorName = req.body.mentorName;
  const students = await studentsOfMentor(mentorName);
  res.send({ mentor: mentorName, students: students.students });
});

app.get("/mentors", async (req, res) => {
  const mentors = await showAllMentors();
  res.send(mentors);
});

app.get("/students", async (req, res) => {
  const students = await showAllStudents();
  res.send(students);
});

app.get("/no-mentor", async (req, res) => {
  const studsWithoutMentor = await studentsWithoutMentor();
  res.send(studsWithoutMentor);
});

app.listen(PORT, () => console.log("Server started in port", PORT));

export { client };
