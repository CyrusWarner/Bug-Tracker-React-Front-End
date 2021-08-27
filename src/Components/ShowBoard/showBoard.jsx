import axios from 'axios';
import React from 'react';
import IssueForm from '../IssueForm/issueForm';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ShowMoreText from "react-show-more-text";
import ShowAllIssues from '../ShowAllIssues/showAllIssues';
const ShowBoard = ({currentBoard, currentUser, userRole, displayBoardUsers}) => {
    const {title, description, boardId} = currentBoard
    const [allIssues, setAllIssues] = useState([]);
    useEffect(() => {
        getAllIssues();
        displayBoardUsers(boardId);
    }, [currentBoard])

    const getAllIssues = async () => {
        if(boardId !== undefined) {
            await axios.get(`http://localhost:27029/api/Issues/BoardIssues/${boardId}`).then((res) => {
                if(res.status === 200){
                    setAllIssues(res.data);
                }
            })
            .catch((err) => {
                if(err){
                    console.log(err);
                }
            })
        }
    }
    return (
        <React.Fragment>
            {currentBoard.length !== 0 &&
            <Container>
                <Row>
                    <Col sm={6}>
                        <h1 className="title">
                        {title}
                        </h1>
                        <ShowMoreText
                        lines={3}
                        className="Roboto-font fs-5"
                        more="Show More"
                        less="Show Less"
                        expanded={false}
                        >
                        <p style={{color: "#212529"}} className="Roboto-font fs-5">{description}</p>
                        </ShowMoreText> 
                        {userRole === "Admin" &&
                        <IssueForm currentUser={currentUser} currentBoard={currentBoard} getAllIssues={getAllIssues}/>
                        }
                        </Col>
                    <Col sm={6}>
            <ShowAllIssues allIssues={allIssues} getAllIssues={getAllIssues} currentUser={currentUser} userRole={userRole}/>
                    </Col>
                </Row>
            </Container>
            }
        </React.Fragment>
        
    )
}

export default ShowBoard;