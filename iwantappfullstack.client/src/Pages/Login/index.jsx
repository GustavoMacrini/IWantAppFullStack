import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Login() {

    const getToken = async () => {
        
        const token = await axios.post("/api/token",
            {
                "EMAIL": "EMPLOYEE@GMAIL.COM",
                "PASSWORD": "123"
            }
        );

        console.log(token);
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <Form className="container">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control style={{ width: '300px' }} type="email" placeholder="email@gmail.com" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control style={{ width: '300px' }} type="password" placeholder="*****" />
            </Form.Group>
            <Button variant="primary" type="submit" >
                Submit
            </Button>
        </Form>
    )
}

export default Login;