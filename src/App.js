import { useState } from 'react'
import { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } from "./redux/postsApi";


function App() {
  const [count, setCount] = useState('');
  const [newPost, setNewPost] = useState('');
  const {data =[], isLoading} = useGetPostsQuery(count);
  const [addPost, {isError}] = useAddPostMutation();
  const [deleteProduct] = useDeletePostMutation();

  const handleAddPost = async () => {
    if(newPost) {
      await addPost({title: newPost}).unwrap();
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
    <div>
      <input 
      type="text" 
      value={newPost}
      onChange={(e) => setNewPost(e.target.value)}
      />
      <button onClick={handleAddPost}>Add</button>
    </div>
    <select value={count} onChange={(e) => setCount(e.target.value)}>
      <option value="">All</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
      <ul>
        {data.map((item) => (<li key = {item.id} onClick={() => handleDeleteProduct(item.id)}>{item.title}</li>))}
      </ul>
    </div>
  );
}

export default App;
