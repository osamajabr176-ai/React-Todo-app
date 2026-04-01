import React, { useEffect, useState,useMemo } from "react";
import Todo from "./Todo";
import ConfirmModal from "../Modals/ConfirmModal";
import UpdateModal from "../Modals/UpdateModal";
import  useToast  from "../contexts/ToastContext";
import { useTodos,useTodosDispatch } from "../contexts/todosContext";

function TodoList() {


  const  todos  = useTodos();
  const  dispatch  = useTodosDispatch();
  const { showToast } = useToast();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [displayTodoType, setDisplayTodoType] = useState("all");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [titleTodo, setTitleTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
    // ✏️ open edit modal
  function handleEdit(todo) {
    setSelectedTodo(todo);
    setShowUpdateModal(true);
  }



  // 🗑 open delete modal
  function handleDeleteClick(todo) {
    setSelectedTodo(todo);
    setShowDeleteModal(true);
  }

  // 🧠 confirm delete
  function confirmDelete() {
  dispatch({ type: "DELETE_TODO", payload: selectedTodo.id });
  setShowDeleteModal(false);
  showToast("تم حذف المهمة ❌", "error");
}

  // 🧠 confirm edit
  function confirmEdit(updatedTodo) {
  
  dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
  setShowUpdateModal(false);
  showToast("تمت تعديل المهمة ✅", "Update");
}

  


  const todosToDisplay = useMemo(() => {
  if (displayTodoType === "finished") {
    return todos.filter(t => t.isFinished);
  } else if (displayTodoType === "pending") {
    return todos.filter(t => !t.isFinished);
  }
  return todos;
}, [todos, displayTodoType]);


  // ✔ add todo
  function handleAddTodo() {
    dispatch({ type: "ADD_TODO", payload: { titleTodo } });
    showToast("تمت إضافة المهمة ✅", "success");
    setTitleTodo("");
  }


  return (

    <div className="flex h-screen items-center justify-center flex-col" dir="rtl">

      <div className="bg-white h-[80vh] w-[50vw] flex flex-col items-center p-6 rounded-lg shadow-lg overflow-y-auto">

        <h1 className="text-4xl font-bold mb-10 underline decoration-sky-400">
          مهامي اليومية 🚀
        </h1>


          {/* UPDATE MODAL */}
      <UpdateModal
        isOpen={showUpdateModal}
        onConfirm={confirmEdit}
        onCancel={() => setShowUpdateModal(false)}
        todo={selectedTodo}
      />

      {/* DELETE MODAL */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        message={`هل أنت متأكد من حذف: ${selectedTodo?.text || ""} ؟`}
      />

        {/* FILTER BUTTONS */}
        <div className="flex gap-6 mb-10">
          <button onClick={() => setDisplayTodoType("all")} className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600">
            الكل
          </button>
          <button onClick={() => setDisplayTodoType("finished")} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            المنجزة
          </button>
          <button onClick={() => setDisplayTodoType("pending")} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
            الغير منجزة
          </button>
        </div>

        {/* TODOS */}
        <div className="flex flex-col gap-4 w-full">
          {todosToDisplay.length > 0 ? (
            todosToDisplay.map((t) => <Todo key={t.id} todo={t} showDeleteModal={handleDeleteClick} deleteConfirmModal={confirmDelete} showEditModal={handleEdit} editConfirmModal={confirmEdit}   />)
          ) : (
            <p className="text-gray-500">لا توجد مهام بعد</p>
          )}
        </div>


        {/* ADD TODO */}
        <div className="flex gap-4 mt-10 w-full">
          <input
            value={titleTodo}
            onChange={(e) => setTitleTodo(e.target.value)}
            type="text"
            placeholder="أضف مهمة جديدة..."
            className="w-full p-3 border rounded-md"
          />

          <button
            onClick={handleAddTodo}
            className="bg-sky-500 px-6 py-3 rounded-md hover:bg-sky-600"
          >
            أضف
          </button>
        </div>

      </div>
    </div>
  );
}

export default TodoList;