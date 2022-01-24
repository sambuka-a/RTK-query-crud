import { useState } from 'react'
import { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } from "./redux/postsApi";

import './app.css';

function App() {
  const [count, setCount] = useState('');
  const [priority, setPriority] = useState(false);
  const [newPost, setNewPost] = useState('');
  const {data =[], isLoading} = useGetPostsQuery(count);
  const [addPost, {isError}] = useAddPostMutation();
  const [deleteProduct] = useDeletePostMutation();

  const handlePriority = () => {
    setPriority(!priority)
  }

  const handleAddPost = async () => {
    if(newPost) {
      await addPost({title: newPost, isComplete: priority}).unwrap();
      setNewPost('');
    }
  }

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap();
  }

  if(isLoading) {
    <h1>Loading...</h1>
  }

  console.log(data);

  return (
    <div className="App">
      <div className='header'>
        <div>
            <input 
            type="text" 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            />
            <div>
              <input 
                type="checkbox" 
                id="" 
                name="priority"
                onChange={handlePriority}
              />
                <label htmlFor="pririty">High Priority</label>
            </div>
            <button className="btn_add" onClick={handleAddPost}>Add</button>
        </div>
        <div>
          <select value={count} onChange={(e) => setCount(e.target.value)}>
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <div className='list'>
      <ul>
            {data.map((item) => (<li className={item.isComplete ? 'completed' : ''} key = {item.id} onClick={() => handleDeleteProduct(item.id)}>{item.title}</li>))}
          </ul>
      </div>  
    </div>
  );
}

export default App;
