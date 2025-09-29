import { useEffect, useState } from "react";
import { createNote, deleteNote, getNotes } from "../services/noteService";
import { Pen, Trash2 } from "lucide-react";
import { formatDate } from "../utils/helper";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes ", error);
      }
    })();
  }, []);

  const handleCreate = async () => {
    try {
      const newNote = await createNote({ title, description });
      setNotes((p) => [newNote, ...p]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating note ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((p) => p.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note ", error);
    }
  };

  return (
    <div className="w-full h-auto mt-12">
      <div className="w-full p-2 sm:p-6 md:p-10 flex flex-col gap-3 ">
        <h2 className="text-2xl text-gray-500 font-semibold">Create Note</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 rounded-md shadow-sm outline-none border-none ring ring-gray-300"
          type="text"
          placeholder="Take a note..."
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 rounded-md shadow-sm outline-none border-none ring ring-gray-300"
          rows={2}
          placeholder="Enter description.."
        />
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md shadow-emerald-200 text-white cursor-pointer"
        >
          Create
        </button>
      </div>

      <div className="p-2 sm:p-6 md:p-10 grid sm:grid-cols-2 gap-4 md:grid-cols-3">
        {notes.map((note) => (
          <div
            className=" px-4 py-2 ring ring-gray-300 rounded-md shadow-md"
            key={note._id}
          >
            <h4 className="text-2xl font-semibold">{note.title}</h4>
            <p className="mt-2 text-gray-500 font-semibold">
              {note.description}
            </p>

            <div className="flex items-center justify-between mt-5">
              <span className="text-sm font-semibold text-gray-400 ">
                {formatDate(note.createdAt)}
              </span>

              <div className="flex gap-3 items-center">
                <button className="p-2 rounded-full bg-black text-white cursor-pointer">
                  <Pen className="size-4" />
                </button>
                <button
                  className="p-2 rounded-full text-white bg-red-400 cursor-pointer"
                  onClick={() => handleDelete(note._id)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notes;
