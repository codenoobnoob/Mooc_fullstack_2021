import React from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.excercises}
    </p>
  );
};

const Content = (props) => {
  const items = [];
  props.parts.forEach((farts) => {
    items.push(
      <p>
        <Part part={farts.name} excercises={farts.excercises} />
      </p>
    );
  });
  return items;
};

const Total = (props) => {
  return (
    <p>
      Number of excercises{" "}
      {props.parts
        .map((part) => part.excercises)
        .reduce((part, next) => part + next)}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of react",
        excercises: 10,
      },
      {
        name: "Using props to pass data",
        excercises: 7,
      },
      {
        name: "State of a component",
        excercises: 14,
      },
    ],
  };
  console.log(Content);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
