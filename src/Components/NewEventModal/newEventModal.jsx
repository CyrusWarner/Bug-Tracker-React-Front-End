import React, {useState} from 'react';
import { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './newEventModal.css'
const NewEventModal = ({onEventAdded, boardUsers, currentBoard, displayBoardUsers}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const {boardId} = currentBoard;
    useEffect(() => {
      displayBoardUsers(boardId)
    },[])
    const onSubmit = (eventData) => {
      const event = {
        title: eventData.title,
        date: eventData.date,
        boardId: boardId,
        assignee: userEmail,
      }
        onEventAdded(event)
        setUserEmail("");
        setText("");
        reset();
    }

    const handleChange = (event) => {
      const value = event.target.value;
      let suggestions = [];
      if (value.length > 0) {
        const regex = new RegExp(`^${value}`, "i");
        suggestions = boardUsers.sort().filter((userData) => regex.test(userData.user.email));
      }
      setSuggestions(suggestions);
      setText(value);
    };
  
    const userSelected = (value) => {
      boardUsers.filter((userData) => {
        if (userData.user.email.toLowerCase() === value.toLowerCase()) {
          setUserEmail(userData.user.email);
          return;
        }
      });
      setText(value);
      setSuggestions([]);
    };
  
    const displaySuggestions = () => {
      if (suggestions.length === 0) {
        return null;
      }
      return (
        <ul>
          {suggestions.map((userData) => {
            return <li onClick={() => userSelected(userData.user.email)}>{userData.user.email}</li>;
          })}
        </ul>
      );
    };
    return (
        <>
        <React.Fragment>
        <Button className="mt-3 mb-3" variant="primary" onClick={handleShow}>
          New Event Or Bug
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Event</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
              <div>
              <label>Event Or Bug Title:</label>
              <input {...register("title", {required: "Please Enter A Title For The Event"})} className="form-control"></input>
              {errors.title && <p className="ms-1" style={{ color: "crimson" }}>{errors.title.message}</p>}
              </div>
              <div>
              <label className="mt-2">Event Or Bug Assignee:</label>
              <div className="eventAutoCompleteText ">
              <input
                aria-label="search"
                placeholder="Email Search..."
                type="search"
                value={text}
                onChange={handleChange}
              ></input>
              {displaySuggestions()}
            </div>
              </div>
              <div>
                  <label className="mt-2">Event Or Bug Date:</label>
                  <input {...register("date", {required: "Please Enter A Date For The Event"})} type="date" className="form-control"></input>
                  {errors.date && <p className="ms-1" style={{ color: "crimson" }}>{errors.date.message}</p>}
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Add Event
            </Button>
           
          </Modal.Footer>
          </Form>
        </Modal>
        </React.Fragment>
      </>
      
    )
}

export default NewEventModal;