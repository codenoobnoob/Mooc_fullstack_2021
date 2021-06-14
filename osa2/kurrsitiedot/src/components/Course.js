import React from "react";

const Header = ({courseName}) => {
  return <h2>{courseName}</h2>;
};

const Part = ({name, excercises}) => {
  return (
    <p>
      {name} {excercises}
    </p>
  );
};

const Content = ({parts}) => {
  const items = [];
  parts.forEach(({name, excercises, id}) => {
    items.push(<Part key={id} name={name} excercises={excercises} />);
  });
  return items;
};

const Total = ({parts}) => {
  const sumOfExcersises = parts.reduce((initial, part) => initial + part.excercises, 0)
    return (
    <p><b>
      total of {sumOfExcersises} excercises
    </b></p>
  );
};

const Course = ({course}) => {
  return (
    <>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
  )
}

export default Course