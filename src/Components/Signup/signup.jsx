import React from 'react';
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Signup = () => {
    const signupFormValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }
    const {register, handleSubmit} = useForm();

    const onSubmit = async (values) => {
        await axios.post("http://localhost:27029/api/User", values).then((res) => {
            if(res.status === 200) {
                console.log(res)
            }
        })
        .catch((err) => {
            if(err){
                console.log(err)
            }
        })
    }
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col sm={2}></Col>
                    <Col sm={8}>
                        <Form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="mb-5">Signup</h1>
                        <label>First Name</label>
                        <div> 
                        <input className="form-control" {...register("firstName")} id="firstName"></input>
                        </div> 
                        <label>Last Name</label>
                        <div>
                        <input className="form-control" {...register("lastName")} id="lastName"></input>
                        </div>
                        <label >Email</label>
                        <div>
                        <input className="form-control" {...register("email")} id="email"></input>
                        </div>
                        <label>Password</label>
                        <div>
                        <input className="form-control" {...register("password")} id="password"></input>
                        </div>
                        <Button type="submit" className="mt-2">Submit</Button>
                        </Form>
                    </Col>
                    <Col sm={2}></Col>
                </Row>
            </Container>

        </React.Fragment>
    )
}

export default Signup;