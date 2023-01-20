const Key = ({ keyData: { id, value }, handleInput }) => {
  return (
    <button id={id} onClick={() => handleInput(value)}>
      {value}
    </button>
  );
};

export default Key;
