import NoteHeader from "../components/header/NoteHeader";
import NoteBody from "../components/body/NoteBody";
import BlockerModal from "../components/modal/BlockerModal";
import ConfirmModal from "../components/modal/confirm-modal/ConfirmModal";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/dataSource";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Archived () {
  const [searchParams, setSearchParams] = useSearchParams();
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [noteTitleKeyword, setNoteTitleKeyword] = useState(searchParams.get('title') || "");
  const [showModal, setShowModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(0);
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] = useState("");

  useEffect(() => {
    updateNotesList();
  },[noteTitleKeyword]);

  //updateNotesList
  const updateNotesList = async () => {
    const {data} = await getArchivedNotes();
    setArchivedNotes(data.filter(note => note.title.toLowerCase().includes(noteTitleKeyword.toLowerCase())));
  }

  //showDeleteModalHandler
  const displayDeleteModal = (noteId, noteTitle) => {
    setDeleteTargetId(noteId);
    setDeleteConfirmationMessage(`Anda yakin ingin menghapus "${noteTitle}" ? Catatan yang dihapus akan hilang selamanya !`);
    setShowModal(true);
  }

  //closeModalHandler
  const closeModal = () => {
    setShowModal(false);
  }

  //deleteHandler
  const onDeleteNote = async (noteId) => {
    const {error} = await deleteNote(noteId);
    if(!error) {
      updateNotesList();
    }
    setShowModal(false);
  }

  //unarchiveNoteHandler
  const unarchiveNoteTarget = async (noteId) => {
    const {error} = await unarchiveNote(noteId);
    if(!error) {
      updateNotesList();
    }
  }

  //searchHandler
  const searchNote = (e) => {
    setNoteTitleKeyword(e.target.value);
    setSearchParams({title: e.target.value});
  }

  return (
    <>
      <NoteHeader headerTitle="Arsip" searchHandler={searchNote} searchValue={noteTitleKeyword} />
      <NoteBody data={archivedNotes} deleteHandler={displayDeleteModal} archivedNoteHandler={unarchiveNoteTarget} />
      <BlockerModal show={showModal} />
      <ConfirmModal show={showModal} closeModalHandler={closeModal} confirmHandler={() => onDeleteNote(deleteTargetId)} confirmationMessage={deleteConfirmationMessage}  />
    </>
  );
}