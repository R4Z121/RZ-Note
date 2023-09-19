import NoteCard from "./NoteCard"

export default function NoteBody ({data, deleteHandler, archivedNoteHandler}) {
  return  data.length ? (
            <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.map(obj => (<NoteCard key={obj.id} detail={obj} deleteHandler={deleteHandler} archivedNoteHandler={archivedNoteHandler} />))}
            </div>
          ) : (
            <div className="flex justify-center items-center p-5">
              <p className="text-red text-base sm:text-lg mt-12">Anda belum memiliki catatan !</p>
            </div>
          )
}