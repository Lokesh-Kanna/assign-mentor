import { client } from "./index.js";

async function addMentor(data) {
  const addedMentor = await client
    .db("School")
    .collection("mentor")
    .insertOne(data);
  return addedMentor;
}

async function addStudent(data) {
  const addedStudent = await client
    .db("School")
    .collection("student")
    .insertOne(data);
  return addedStudent;
}

async function assignStudent(data) {
  const assignStudent = await client
    .db("School")
    .collection("mentor")
    .updateOne(
      { name: data.mentorName },
      { $push: { students: data.studentName } }
    );
}

async function addMentorsToStudents(data) {
  const addedMentorsToStudent = await client
    .db("School")
    .collection("student")
    .updateOne(
      { name: data.studentName },
      { $set: { mentor: data.mentorName } }
    );
  return addedMentorsToStudent;
}

async function addNewStudArr(data, newStudentArr) {
  const addedMentorsToStudent = await client
    .db("School")
    .collection("mentor")
    .updateOne(
      { name: data.mentorName },
      { $set: { students: newStudentArr } }
    );
  return addedMentorsToStudent;
}

async function changeMentor(data) {
  const changeMentor = await client
    .db("School")
    .collection("student")
    .updateOne(
      { name: data.studentName },
      { $set: { mentor: data.mentorName } }
    );
  return changeMentor;
}

async function studentsOfMentor(mentorName) {
  const changeMentor = await client
    .db("School")
    .collection("mentor")
    .findOne({ name: mentorName });
  return changeMentor;
}

async function showAllMentors() {
  const mentors = await client
    .db("School")
    .collection("mentor")
    .find()
    .toArray();
  return mentors;
}

async function showAllStudents() {
  const students = await client
    .db("School")
    .collection("student")
    .find()
    .toArray();
  return students;
}

async function studentsWithoutMentor(filter) {
  const studsWithoutMentor = await client
    .db("School")
    .collection("student")
    .find({ mentor: "" })
    .toArray();
  return studsWithoutMentor;
}

export {
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
};
