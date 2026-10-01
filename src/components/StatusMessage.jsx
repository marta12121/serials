function StatusMessage({ message, retry }) {
  return (
    <div>
      <p>{message}</p>
      {retry && <button onClick={retry}>Спробувати ще</button>}
    </div>
  );
}
export default StatusMessage;
