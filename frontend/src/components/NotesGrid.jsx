import { Pen, Trash2 } from "lucide-react";
import { formatDate } from "../utils/helper";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const NotesGrid = ({
  notes,
  editingId,
  setEditingId,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  handleDelete,
  handleEdit,
  handleUpdate,
  handleOnDragEnd,
}) => {

  return (
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
  );
};
export default NotesGrid;
