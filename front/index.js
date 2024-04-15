async function getCourses(url) {
  const courses = (await fetch(url)).json();
  //   console.log(courses.json);
  const data = await courses;
  console.log(data.data.courses);
}
getCourses("http://localhost:3050/api/courses");
// fetch("http://localhost:3050/api/courses")
//   .then((res) => res.json())
//   .then((data) => console.log(data.data.courses));
