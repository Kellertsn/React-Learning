import React from "react";

// 1.
// class myPureComponent extends React.Component {
//   shouldComponentUpdate(nextProps) {
//     return this.props.car !== nextProps.car ? true : false;
//   }
// }
// export default myPureComponent;

// 2.
// structureClone(obj)
// object.assign
// concat


//3.
const CourseCatalog = () => {
  const courseCatalog = [
    {
      department: "Computer Science",
      courses: [
        { code: "CS101", title: "Intro to Programming", credits: 3 },
        { code: "CS201", title: "Data Structures", credits: 4 },
      ],
      faculty: {
        chair: "Dr. Smith",
        office: "Room 101",
      },
    },
    {
      department: "Mathematics",
      courses: [
        { code: "MATH101", title: "Calculus I", credits: 4 },
        { code: "MATH201", title: "Linear Algebra", credits: 3 },
      ],
      faculty: {
        chair: "Dr. Allen",
        office: "Room 202",
      },
    },
  ];

  const updateA = courseCatalog.map((dept) =>
    dept.department === "Mathematics"
      ? { ...dept, department: "Applied Math" }
      : dept
  );

  const updateB = courseCatalog.map((dept) =>
    dept.department === "Computer Science"
      ? {
          ...dept,
          courses: [
            ...dept.courses,
            { code: "CS301", title: "Algorithms", credits: 4 },
          ],
        }
      : dept
  );

  const updateC = courseCatalog.map((dept) =>
    dept.department === "Mathematics"
      ? {
          ...dept,
          courses: dept.courses.filter(
            (course) => course.title !== "Linear Algebra"
          ),
        }
      : dept
  );

  const updateD = courseCatalog.map((dept) =>
    dept.faculty.chair === "Dr. Smith"
      ? {
          ...dept,
          faculty: { ...dept.faculty, office: "Room 111" },
        }
      : dept
  );

  console.log(updateA);
  console.log(updateB);
  console.log(updateC);
  console.log(updateD);

  console.log(courseCatalog);
};
// class CourseCatalog extends React.Component {
//   state = {
//     courses: [...courseCatalog],
//   };

//   handleChange(id) {
//     const updatedCourses = this.state.courses.map((course) =>
//       course.department === "Mathematics"
//         ? { ...course, department: "Applied Math" }
//         : course
//     );

//     this.setState({ courses: updatedCourses });
//   }

//   render() {
//     return (
//       <>
//         <h2>Course Catalog</h2>
//         <div>
//           {/* <ul>{this.state.courses}</ul> */}
//           <ul>
//             {this.state.courses.map((course, index) => (
//               <li key={index}>{course.department}</li>
//             ))}
//           </ul>
//           <button onClick={() => this.handleChange()}>Change</button>
//         </div>
//       </>
//     );
//   }
// }

export default CourseCatalog;
