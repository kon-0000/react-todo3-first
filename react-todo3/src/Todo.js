
import React, { useState } from 'react';

const Todo = ({todo,toggleTodo,updateTodo}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todo.name);

  const handleTodoClick=(event)=>{
    const selectedValue = event.target.value;
    if(selectedValue === '完了'){
    toggleTodo(todo.id)
  }else{
    return;
  }
}

const handleEditClick = () => {
  setIsEditing(true);
};

const handleSaveClick = () => {
  updateTodo(todo.id, newName); // 新しい名前を保存
  setIsEditing(false); // 編集モードを終了
};

const handleCancelClick = () => {
  setIsEditing(false); // 編集モードを終了
  setNewName(todo.name); // 元の名前に戻す
};

return (
  <div>
    {isEditing ? (
      <>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)} // テキストボックスの値を更新
        />
        <button onClick={handleSaveClick}>保存</button>
        <button onClick={handleCancelClick}>キャンセル</button>
      </>
    ) : (
      <>
        <span>{todo.name}</span>
        <button onClick={handleEditClick}>編集</button>
        <select onChange={handleTodoClick}>
        <option value="未着手">未着手</option>
            <option value="作業中">作業中</option>
            <option value="完了">完了</option>
          </select>
        </>
      )}
    </div>
  );
}

export default Todo