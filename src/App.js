import { useGetPostsQuery } from "./redux/postsApi";


function App() {
  const {data =[], isLoading} = useGetPostsQuery();

  if(isLoading) {
    <h1>Loading...</h1>
  }

  console.log(data);

  return (
    <div className="App">
      <ul>
        {data.map((item) => (<li key = {item.id}>{item.title}</li>))}
      </ul>
    </div>
  );
}

export default App;
