import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home";

export interface Student {
  name: string;
  age: number;
  grade: string;
}

interface MainLayoutProps {
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ onLogout }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const title = "My App";

  // Load students from localStorage
  const loadStudents = () => {
    const saved: Student[] = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(saved);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Student Page Component
  const StudentPage: React.FC = () => {
    return (
      <div className="text-white">
        <h2 className="text-2xl mb-4">Students List</h2>
        {students.length === 0 ? (
          <p>No students added yet.</p>
        ) : (
          <table className="min-w-full border border-gray-400">
            <thead>
              <tr className="bg-gray-700">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">{student.age}</td>
                  <td className="border px-4 py-2">{student.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Navbar
        title={title}
        onSidebarHide={() => {}}
        onLogout={onLogout}
        onStudentAdded={loadStudents} // Pass refresh function
      />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/student" element={<StudentPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
