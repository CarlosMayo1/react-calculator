import Key from "./Key";

const Keyboard = ({ handleInput, calcData }) => {
  return (
    <div className="keyboard">
      {calcData.map((key) => (
        <Key key={key.id} keyData={key} handleInput={handleInput} />
      ))}
    </div>
  );
};

export default Keyboard;
