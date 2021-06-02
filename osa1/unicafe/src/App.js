import React, { useState } from "react";

const CreateStats = ({ feedbacks }) => {
  if (feedbacks.all === 0) {
    return <p>Nofeedbacks given</p>;
  }
  const stats = [];
  const keys = Object.keys(feedbacks);
  keys.forEach((key) => {
    if (key === "positive") {
      stats.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{feedbacks[key]} %</td>
        </tr>
      );
    } else {
      stats.push(
        <tr key={key}>
          <td key={key}>{key}</td>
          <td>{feedbacks[key]}</td>
        </tr>
      );
    }
  });
  return (
    <table>
      <tbody>{stats}</tbody>
    </table>
  );
};

const CreateFeedback = ({ functions }) => {
  const buttons = [];
  const keys = Object.keys(functions);
  keys.forEach((key) => {
    buttons.push(
      <button onClick={functions[key]} key={key}>
        {key.toString()}
      </button>
    );
  });
  return buttons;
};

const App = () => {
  const [feedbacks, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });

  const handleGoodClick = () => {
    const newFeedbacks = {
      ...feedbacks,
      good: feedbacks.good + 1,
      all: feedbacks.all + 1,
    };
    calcPositiveAndAverage(newFeedbacks);
  };

  const handleNeutralClick = () => {
    const newFeedbacks = {
      ...feedbacks,
      neutral: feedbacks.neutral + 1,
      all: feedbacks.all + 1,
    };
    calcPositiveAndAverage(newFeedbacks);
  };

  const handleBadClick = () => {
    const newFeedbacks = {
      ...feedbacks,
      bad: feedbacks.bad + 1,
      all: feedbacks.all + 1,
    };
    calcPositiveAndAverage(newFeedbacks);
  };

  const calcPositiveAndAverage = (newFeedbacks) => {
    newFeedbacks = {
      ...newFeedbacks,
      positive: (newFeedbacks.good / newFeedbacks.all) * 100,
      average: (newFeedbacks.good - newFeedbacks.bad) / newFeedbacks.all,
    };
    setFeedback(newFeedbacks);
  };

  const feedbackFunctions = {
    good: handleGoodClick,
    neutral: handleNeutralClick,
    bad: handleBadClick,
  };

  return (
    <div>
      <h1>give feedback</h1>
      <CreateFeedback functions={feedbackFunctions} />
      <h1>statistics</h1>
      <CreateStats feedbacks={feedbacks} />
    </div>
  );
};

export default App;
