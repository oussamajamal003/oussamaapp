import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/PersonAdd";
import Swal from "sweetalert2";
import { Student } from "../layouts/MainLayout";

interface NavbarProps {
  title: string;
  onSidebarHide: () => void;
  onLogout: () => void;
  onStudentAdded?: () => void; // callback to refresh table
}

const Navbar: React.FC<NavbarProps> = ({
  title,
  onSidebarHide,
  onLogout,
  onStudentAdded,
}) => {
  const handleAddStudent = async () => {
    // Step 1: Name
    const { value: name } = await Swal.fire({
      title: "Add Student",
      input: "text",
      inputLabel: "Full Name",
      inputPlaceholder: "Enter student name",
      showCancelButton: true,
      confirmButtonText: "Next",
      background: "#1f2937",
      color: "white",
    });
    if (!name) return;

    // Step 2: Age & Grade
    const { value: formValues } = await Swal.fire({
      title: "Student Details",
      html:
        '<input id="swal-age" type="number" class="swal2-input" placeholder="Age">' +
        '<input id="swal-grade" class="swal2-input" placeholder="Grade">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Finish",
      preConfirm: () => {
        const ageInput = (document.getElementById("swal-age") as HTMLInputElement).value;
        const gradeInput = (document.getElementById("swal-grade") as HTMLInputElement).value;
        if (!ageInput || !gradeInput) {
          Swal.showValidationMessage("Please enter all fields");
          return;
        }
        return { name, age: Number(ageInput), grade: gradeInput } as Student;
      },
      background: "#1f2937",
      color: "white",
    });

    if (formValues) {
      // Save to localStorage
      const saved: Student[] = JSON.parse(localStorage.getItem("students") || "[]");
      saved.push(formValues);
      localStorage.setItem("students", JSON.stringify(saved));

      // Refresh table in MainLayout
      onStudentAdded?.();

      Swal.fire({
        icon: "success",
        title: "Student Added!",
        text: `${formValues.name} was added successfully`,
        background: "#1f2937",
        color: "white",
      });
    }
  };

  return (
    <nav className="bg-blue-500 flex justify-between text-white py-2 px-4">
      <div className="flex items-center">
        <button onClick={onSidebarHide}>
          <MenuIcon />
        </button>
        <span className="ps-2 font-bold">{title}</span>
      </div>

      <div className="flex items-center">
        <Link className="mx-2" to="/home">Home</Link>
        <Link className="mx-2" to="/student">Student</Link>

        <button
          className="mx-2 bg-green-600 px-3 py-1 rounded flex items-center"
          onClick={handleAddStudent}
        >
          <AddIcon />
          <span className="ps-1">Add Student</span>
        </button>

        <button className="mx-2" onClick={onLogout}>
          <LogoutIcon />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
