import * as React from 'react';
import { Button } from 'react-bootstrap';

const initialStories = [
  {
    title: 'React',
    url: 'https://react.dev/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];






/* useStorageState  key = 'search' =>> localStorage  key = 'search'
With the key in place, you can use this new custom hook more than once in your application
 useStorageState  key = 'othersearch' =>> localStorage  key = 'othersearch'
*/
const useStorageState = (key,initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value,key]);

  return [value, setValue]
};




const App = () => {


 const [searchTerm, setSearchTerm] = useStorageState(
  'search',
  'React'
  );

 const [stories, setStories] = React.useState(initialStories);
  
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  }



  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

    <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
        >
        
         <Button variant="primary">Search:</Button>
         </InputWithLabel>
      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

/////InputWithLabel
const InputWithLabel = ({
  id,
  label,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
    //A
  const inputRef = React.useRef();
    // C
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      // D
      inputRef.current.focus();
    }
  }, [isFocused]);


  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      {/* B */}
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>

  )
 
}
/* SEARCH props => App*/
const Search = ({ search, onSearch }) => (
  <>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
    />
  </>
);



/* LIST props =>App*/
const List = ({ list,onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item 
      key={item.objectID} 
      item={item} 
       onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
);


/* ITEM props => List*/

const Item = ({ item,onRemoveItem }) =>(

  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={()=>onRemoveItem(item)}>
        Dismis
      </button>
    </span>
  </li>
);

export default App;