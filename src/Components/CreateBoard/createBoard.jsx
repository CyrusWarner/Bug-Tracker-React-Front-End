import React from "react";
import { Form, Button} from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./createBoard.css";
import { toast } from "react-toastify";
const CreateBoard = ({ userId, getUsersBoards }) => {
  const { register, reset, handleSubmit, formState: {errors} } = useForm();
  const onSubmit = async (data) => {
    const board = {
      title: data.title,
      description: data.description,
      userId: userId,
    };
    
    await axios
      .post("http://localhost:27029/api/Board", board)
      .then((res) => {
        if (res.status === 200) {
          addRelationshipToUserBoardTable(res.data);
          toast.success("Board Added Successfully")
        }
      })
      .catch((err) => {
        if (err) {
          toast.error("Error Creating Board")
        }
      });
      reset();
  };

  const addRelationshipToUserBoardTable = async (newBoard) => {
    await axios.post(`http://localhost:27029/api/Board/addUserToBoard/${userId}`, newBoard).then((res) => {
      getUsersBoards();
    })
  }

  return (
    <React.Fragment>
      <div data-testid='createBoard-1'>
          <div className="text-center">
            <h1 className="title">Add New Board</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating">
            <input
              placeholder="Board Title..."
              type="text"
              className="form-control"
              {...register("title", {required: true})}
            ></input>
            <label className="floatingInput">Board Title...</label>
            </div>
            {errors.title && <p className="ms-1" style={{color: "crimson"}}>Board Title Is Required</p>}
            <textarea
              placeholder="Board Description..."
              type="text"
              className="form-control mt-2"
              {...register("description", {required: true})}
            ></textarea>
            {errors.description && <p className="ms-1" style={{color: "crimson"}}>Board Description Is Required</p>}
            <div className="text-center">
            <Button
              type="submit"
              className="mt-2 mb-2"
            >
              Add Board
            </Button>
            </div>
          </Form>
          </div>
    </React.Fragment>
  );
};

export default CreateBoard;
