const Header = (props) => 
{
  const { name } = props
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = (props) =>
{
  const {name, exercises} = props
  return (
    <div>
      <p>{name}</p>
      <p>exercises: {exercises}</p>
    </div>
  )
}

const Footer = (props) => 
{
  const {parts} = props
  return(
    <div>
      <b><p>toals of {parts.reduce((total,part) => total + part.exercises, 0)} exercises</p></b>
    </div>
  )
}

const Content = (props) => {
  const { parts, course_name } = props
  console.log(parts)
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} /> 
    )}
    </div>
  )
}

const Course = (props) => 
{
  const {course} = props
  return (
    <div id={"course"+course.id}>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Footer parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => 
        <Course course={course}/>
      )}
    </div>
  )
}

export default App