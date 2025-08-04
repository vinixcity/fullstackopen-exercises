// Course.js

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>Total of {total} exercises</strong></p>
}

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
