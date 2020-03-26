import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
  title: '',
  director: '',
  metascore: ''
};

const UpdateForm = props => {
  // ********** get the params and history objects ********** //
  const { id } = useParams();
  const history = useHistory();
  // ********** get the params and history objects ********** //

  const [item, setItem] = useState(initialItem);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  // ********** Find the item and set it to state ********** //
  // get the id from params
  // loop through the items list to find the item
  // set the item to state to pre-populate the form\
  useEffect(() => {
    const itemToUpdate = props.items.find(e => `${e.id}` === id);

    if (itemToUpdate) {
      setItem(itemToUpdate);
    }
  }, [props.items, id]);
  // ********** Find the item and set it to state ********** //

  const handleSubmit = e => {

    e.preventDefault();
    const index = props.items.findIndex(item => item.id === id);
    // make a PUT request to edit the item

    // ********** Make the put request ********** //
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(res => {
          let moviesArray = props.items;
          moviesArray[index] = res.data;

        // update state in App through the setter function
        // navigate user to the item page (or to the shop)
        // (Potentially, you could just show a success message without navigating)
        props.setItems(moviesArray);
        console.log(res.data);
        history.push(`/movies/${id}`);
      })
      .catch(err => console.log(err));
    // ********** Make the put request ********** //
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
