import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
import { ClipLoader } from "react-spinners";



const AddEditNotes = ({ noteData, type, onClose, getAllNotes, showToastMessage }) => {

    const [title, settitle] = useState(noteData?.title || "");
    const [content, setcontent] = useState(noteData?.content || "")
    const [tags, setTags] = useState(noteData?.tags || [])
    const [error, seterror] = useState(null)
    const [loading, setLoading] = useState(false );



    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
            });

            if (response.data && response.data.note) {
                showToastMessage("Note Added Successfully")
                getAllNotes()
                onClose()
            }


        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                seterror(error.response.data.message)

            }
        } finally {
            setLoading(false)
        }
    }


    const editNote = async () => {
        const noteId = noteData._id

        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags,
            });

            if (response.data && response.data.note) {
                showToastMessage("Note Update Successfully")
                getAllNotes()
                onClose()
            }


        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                seterror(error.response.data.message)
            }
        } finally {
            setLoading(false)
        }
    }


    const handleAddNote = () => {
        if (!title) {
            seterror("Please enter the title")
        }

        if (!content) {
            seterror("Please enter the Content")
        }

        seterror("")
        setLoading(true)

        if (type === "edit") {
            editNote()
        }
        else {
            addNewNote()
        }
    }

    return (
        <div className='relative'>

            <button
                onClick={onClose}
                className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'>
                <MdClose className='text-xl text-slate-400' />
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input type="text"
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Go To Gym At 5'
                    value={title}
                    onChange={({ target }) => settitle(target.value)} />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label htmlFor="input-label">CONTENT</label>
                <textarea
                    type="text"
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded '
                    placeholder='Content'
                    rows={10}
                    value={content}
                    onChange={({ target }) => setcontent(target.value)} />
            </div>

            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && (
                <p className='text-red-500 text-xs pt-4'>{error}</p>
            )}


            <button
                onClick={() => handleAddNote()}
                className='btn-primary font-medium mt-5 p-3'>
                    
                {type === 'edit' ? (
                    loading ? <ClipLoader color="white" size={18} /> : "UPDATE"
                ) : (
                    loading ? <ClipLoader color="white" size={18} /> : "ADD"
                )}

            </button>

        </div>
    )
}

export default AddEditNotes
