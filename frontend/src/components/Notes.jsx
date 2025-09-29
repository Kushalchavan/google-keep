import { useEffect, useState } from "react";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../services/noteService";
import { Pen, Trash2 } from "lucide-react";
import { formatDate } from "../utils/helper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Edit note states
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

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

  const handleEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditDescription(note.description);
  };

  const handleUpdate = async (id) => {
    try {
      const updatedNote = await updateNote(id, {
        title: editTitle,
        description: editDescription,
      });

      setNotes((prev) => prev.map((n) => (n._id === id ? updatedNote : n)));

      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
    } catch (error) {
      console.error("Error updating note ", error);
    }
  };

  //  Reorder logic for drag & drop
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    setNotes(items);
  };

  return (
    <div className="w-full h-auto mt-12">
      {/* Create Note Section */}
      <div className="w-full p-2 sm:p-6 md:p-10 flex flex-col gap-3 ">
        <h2 className="text-2xl text-gray-500 font-semibold">Create Note</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 rounded-md shadow-sm outline-none border-none ring ring-gray-300 dark:placeholder:text-gray-400 dark:text-white"
          type="text"
          placeholder="Take a note..."
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 rounded-md shadow-sm outline-none border-none ring ring-gray-300 dark:placeholder:text-gray-400 dark:text-white"
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

      {/*  Notes Grid with Drag & Drop */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="notes" direction="horizontal">
          {(provided) => (
            <div
              className="p-2 sm:p-6 md:p-10 grid sm:grid-cols-2 gap-4 md:grid-cols-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {notes.map((note, index) => (
                <Draggable key={note._id} draggableId={note._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="px-4 py-2 ring dark:ring-gray-700 ring-gray-300 rounded-md shadow-md"
                    >
                      {editingId === note._id ? (
                        <div>
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-2 py-1 border-none rounded-md ring ring-gray-300 dark:placeholder:text-gray-400 dark:text-white"
                            placeholder="Edit title..."
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full px-2 py-1 border-none rounded-md mt-2  ring ring-gray-300 dark:placeholder:text-gray-400 dark:text-white"
                            rows={2}
                            placeholder="Edit description..."
                          />
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() => handleUpdate(note._id)}
                              className="px-3 py-1 bg-green-600 text-white rounded-md cursor-pointer "
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 bg-gray-400 text-white rounded-md cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="dark:text-white text-2xl font-semibold">
                            {note.title}
                          </h4>
                          <p className="mt-2 text-gray-500 font-semibold">
                            {note.description}
                          </p>

                          <div className="flex items-center justify-between mt-5">
                            <span className="text-sm font-semibold text-gray-400 ">
                              {formatDate(note.createdAt)}
                            </span>

                            <div className="flex gap-3 items-center">
                              <button
                                onClick={() => handleEdit(note)}
                                className="p-1 rounded-full bg-black text-white cursor-pointer"
                              >
                                <Pen className="size-4" />
                              </button>
                              <button
                                className="p-1 rounded-full text-white bg-red-600 cursor-pointer"
                                onClick={() => handleDelete(note._id)}
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Notes;
