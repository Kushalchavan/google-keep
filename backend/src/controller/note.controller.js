import Notes from "../model/note.model.js";

export const createNote = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const note = await Notes.create({
      title,
      description,
      author: req.user._id,
    });

    res.status(201).json({ id: note._id, note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating note", error: error.message });
  }
};

export const updateNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await Notes.findByIdAndUpdate(
      req.params.id,
      { title, description, author: req.user._id }, // only update if it belongs to user
      { new: true }
    );
    if (!note) return res.status(400).json({ message: "No note found" });

    return res.status(200).json(note);
  } catch (error) {
    req
      .status(500)
      .json({ message: "Error updating notes", error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findById({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!note) return res.status(400).json({ message: "No note found" });

    await note.deleteOne();

    res
      .status(200)
      .json({ message: "Note deleted successfully", id: note._id });
  } catch (error) {
    req
      .status(500)
      .json({ message: "Error deleting note", error: error.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const note = await Notes.find().sort({ createdAt: -1 }); // for latest first

    res.status(200).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting notes", error: error.message });
  }
};
