import React from 'react'

const Course = ({course}) => {
    return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
    </div>
      
    )
  }
  const Header = ({course}) => {
    return (
    <h1>{course.name}</h1>
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
      {
        course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)
      }
      <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
        <p>
          {name} {exercises}
        </p>
      )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce( (s, p) =>  s + p['exercises'], 0)
    return (
      <p><strong>total of {total} exercises</strong></p>
    )
  }

  export default Course