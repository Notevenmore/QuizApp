import "../App.css";

function Form({ data, req, handleSubmit }) {
  return (
    <div className="flex flex-col items-center gap-5">
      {data.map((value, index) => {
        return (
          <input key={index} value={value.value} placeholder={value.placeholder} onChange={(e) => value.setValue(e.target.value)} required className="rounded-md min-w-[20vw] min-h-[6vh] p-3 focus:outline-rose-800 placeholder:text-black" />
        );
      })}
      <button type="submit" onClick={() => handleSubmit()} className="bg-gradient-to-r from-cyan-500 to-blue-500 px-14 rounded-lg py-2 text-white font-extrabold">
        {req}
      </button>
    </div>
  );
}

export default Form;
