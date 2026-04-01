import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import  useToast  from "../contexts/ToastContext";
import { useTodosDispatch } from "../contexts/todosContext";

function Todo({ todo, showDeleteModal, showEditModal}) {
  
  const { showToast } = useToast();
  const  dispatch  = useTodosDispatch();
  // ✔ toggle finished
  function handleCheck() {
  dispatch({ type: "TOGGLE_TODO", payload: todo.id });
    if (!todo.isFinished) {
      showToast("تم انجاز المهمة ✅", "success");
    } else {
      showToast("تم إلغاء إنجاز المهمة ❌", "error");
    }
  }

  // ✏️ open edit modal
  function handleEdit() {
    showEditModal(todo);
  }

  // 🗑 open delete modal
  function handleDeleteClick() {
    showDeleteModal(todo);
  }

  return (
    <div className="bg-[#283593] w-full rounded-md" dir="rtl">
      <div className="grid grid-cols-2 items-center gap-4 hover:shadow-lg transition-all duration-300">

        {/* TEXT */}
        <div className="text-white mx-10 my-5 ">
          <h4 className={`text-lg font-bold ${todo.isFinished ? "line-through" : ""}`}>
            {todo.text}
          </h4>
          <p className="text-sm text-gray-300">{todo.desc}</p>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end mx-12 gap-5">

          {/* CHECK */}
          <button
            onClick={handleCheck}
            className={
              todo.isFinished
                ? "cursor-pointer border border-white bg-green-700 rounded-2xl p-2 hover:bg-green-600 transition"
                : "cursor-pointer border border-green-700 bg-white rounded-2xl p-2 hover:bg-gray-400 transition"
            }
          >
            <FaCheck
              className={todo.isFinished ? "text-white" : "text-green-500"}
            />
          </button>

          {/* EDIT */}
          <button
            onClick={handleEdit}
            className="cursor-pointer border border-blue-700 bg-white rounded-2xl p-2 hover:bg-gray-400 transition"
          >
            <FiEdit className="text-blue-500" />
          </button>

          {/* DELETE */}
          <button
            onClick={handleDeleteClick}
            className="cursor-pointer border border-red-500 bg-white rounded-2xl p-2 hover:bg-gray-400 transition"
          >
            <FaRegTrashAlt className="text-red-500" />
          </button>

        </div>
      </div>
    </div>
  );
}

export default Todo;