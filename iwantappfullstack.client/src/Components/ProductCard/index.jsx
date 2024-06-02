//import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductCard(prop) {

    //const [product, setProduct] = useState(prop);

    const exclude = async () => {
        await axios.delete(`/api/products/${prop.id}`, {
            headers: {
                Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkVNUExPWUVFQEdNQUlMLkNPTSIsIm5hbWVpZCI6IjU1NmVlNGZiLTIzMWItNDhiMi05ODg4LTE3NWQ0NzNjNTdmYiIsIkVtcGxveWVlQ29kZSI6IjA5OSIsIk5hbWUiOiJFbXBsb3llZSIsIkNyZWF0ZWRCeSI6ImQ3MjE1YTkyLTA3M2UtNGZmMi1iN2ZkLWU4NDdlYTc0ZDk1NiIsIm5iZiI6MTcxNTI4NDU4OCwiZXhwIjoxNzQ2ODIwNTg4LCJpYXQiOjE3MTUyODQ1ODgsImlzcyI6IklXYW50QXBwSXNzdWVyIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMjIvIn0.Jnzr04kO3pc3pabD7Uq6_FO21ORmpIla1gKfnzKwDFA"
            }
        });

        prop.onRemove(prop.id);
    }

    return (
        <Card style={{ width: '18rem' }}>
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Card.Title>{prop.name} </Card.Title>
                    <Card.Title>{"R$ " + prop.price}</Card.Title>
                </div>
                <Card.Text>
                    {prop.description}
                </Card.Text>

                {(prop.edit == true) ?
                    <div className="d-flex justify-content-between">
                        <Button
                            variant="primary"
                            as={Link}
                            to={`/products/edit/${prop.id}`}
                            
                        >
                            Editar

                        </Button>
                        <Button variant="primary" className="btn-danger" onClick={() => exclude()}>Remover</Button>
                    </div>
                    :
                    <Button variant="primary"> + Carrinho</Button>
                }
            </Card.Body>
        </Card>
    )
}

export default ProductCard;
