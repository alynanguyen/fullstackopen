const Courses = ({courses}) => {

    return(
      <div>
        {courses.map((course) => (<Course course={course} key={course.id} />))}
      </div>
    )
  }

  const Course = ({course}) => {

    return(
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )

  }

  const Header = ({course}) =>{
    return(
      <h1>{course}</h1>
    )
  }

  const Part =({part}) =>{
    return(
      <p>{part.name} {part.exercises}</p>
    )
  }

  const Content = ({parts}) =>{
    return(
      <div>
      {parts.map((part) => (<Part part={part} key={part.id} />))}
      </div>
    )
  }

  const Total = ({parts}) =>{

    return(
      <p><b>Total number of exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)}</b></p>
    )
  }

  export default Courses