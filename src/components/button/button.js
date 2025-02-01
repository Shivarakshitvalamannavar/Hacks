export default function Button({ text, onClick }) {
    return (
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClick}>
        {text}
      </button>
    );
  }