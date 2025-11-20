import Swal from "sweetalert2";
import { useState } from "react";

const Student = () => {
  const [studentData, setStudentData] = useState({});

  const handleAddStudent = async () => {
    const step1 = await Swal.fire({
      title: "Add Student",
      input: "text",
      inputLabel: "Student Name",
      inputPlaceholder: "Enter full name",
      showCancelButton: true,
      confirmButtonText: "Next",
      background: "#1f2937",
      color: "white",
    });
    if (!step1.value) return;
    const name = step1.value;

    const step2 = await Swal.fire({
      title: "Student Age",
      input: "number",
      inputLabel: "Age",
      inputPlaceholder: "Enter age",
      showCancelButton: true,
      confirmButtonText: "Next",
      background: "#1f2937",
      color: "white",
    });
    if (!step2.value) return;
    const age = step2.value;

    const step3 = await Swal.fire({
      title: "Student Grade",
      input: "text",
      inputLabel: "Grade",
      inputPlaceholder: "Grade (A/B/C...)",
      showCancelButton: true,
      confirmButtonText: "Finish",
      background: "#1f2937",
      color: "white",
    });
    if (!step3.value) return;
    const grade = step3.value;

    setStudentData({ name, age, grade });

    Swal.fire({
      icon: "success",
      title: "Student Added!",
      text: `${name} has been added.`,
      background: "#1f2937",
      color: "white",
    });
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold">Student Page</h1>
      <button
        onClick={handleAddStudent}
        className="bg-green-500 px-4 py-2 mt-4 rounded"
      >
        Add Student
      </button>

      {studentData.name && (
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <p><b>Name:</b> {studentData.name}</p>
          <p><b>Age:</b> {studentData.age}</p>
          <p><b>Grade:</b> {studentData.grade}</p>
        </div>
      )}
    </div>
  );
};

export default Student;
