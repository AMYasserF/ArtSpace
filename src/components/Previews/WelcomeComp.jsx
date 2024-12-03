import '../../css/Welcome.css';

function WelcomeComp({ name }) {
    if (!name) return <div>No username provided</div>; // Handle missing `name`
  return (
    <div className="welcome">
      <h1>Welcome, {name}! </h1>
    </div>
  );
}

export default WelcomeComp;
