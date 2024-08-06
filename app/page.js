"use client"


import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTasks = mainTask.map((task, index) => {
        if (index === editIndex) {
          return { title, desc };
        }
        return task;
      });
      setMainTask(updatedTasks);
      setEditIndex(null);
    } else {
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (index) => {
    const updatedTasks = mainTask.filter((_, i) => i !== index);
    setMainTask(updatedTasks);
  };

  const editHandler = (index) => {
    const taskToEdit = mainTask[index];
    setTitle(taskToEdit.title);
    setDesc(taskToEdit.desc);
    setEditIndex(index);
  };

  const rendered = mainTask.map((t, i) => (
    <li key={i} className="flex justify-between">
      <div>
        <h5>{t.title}</h5>
        <h6>{t.desc}</h6>
      </div>
      <div>
        <button onClick={() => editHandler(i)} className="bg-blue-600 rounded border-black mx-1">
          Edit
        </button>
        <button onClick={() => deleteHandler(i)} className="bg-red-600 rounded border-black mx-1">
          Delete
        </button>
      </div>
    </li>
  ));

  return (
    <>
      <h1 className="bg-black text-white p-5 text-center font-bold">Aman's To Do List</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="border-4 border-black p-2 mt-2 mx-5"
          placeholder="Enter a task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="border-4 border-black p-2 mt-2"
          placeholder="Enter a description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit" className="bg-yellow-500 rounded border-4 border-black p-2 mt-2 mx-5">
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <div className="bg-indigo-900 mt-5">
        <ul>{rendered}</ul>
      </div>
    </>
  );
};

export default Page;
