
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProductsAdd() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const getCategories = async () => {
        try {
            const response = await axios.get("/api/categories", {
                headers: {
                    Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkVNUExPWUVFQEdNQUlMLkNPTSIsIm5hbWVpZCI6IjU1NmVlNGZiLTIzMWItNDhiMi05ODg4LTE3NWQ0NzNjNTdmYiIsIkVtcGxveWVlQ29kZSI6IjA5OSIsIk5hbWUiOiJFbXBsb3llZSIsIkNyZWF0ZWRCeSI6ImQ3MjE1YTkyLTA3M2UtNGZmMi1iN2ZkLWU4NDdlYTc0ZDk1NiIsIm5iZiI6MTcxNTI4NDU4OCwiZXhwIjoxNzQ2ODIwNTg4LCJpYXQiOjE3MTUyODQ1ODgsImlzcyI6IklXYW50QXBwSXNzdWVyIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMjIvIn0.Jnzr04kO3pc3pabD7Uq6_FO21ORmpIla1gKfnzKwDFA"
                }                
            });
            setCategories(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    const createProduct = async () => {
        try {
            if (!name || !description || !category || !price) {
                toast.error("Preencha todos os campos!");
                setSubmitted(true);
                return;
            }

            await axios.post("/api/products",
            {
                name: name,
                description: description,
                categoryId: category,
                price: price,
                hasStock: true
            },
            {
            headers: {
                Authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkVNUExPWUVFQEdNQUlMLkNPTSIsIm5hbWVpZCI6IjU1NmVlNGZiLTIzMWItNDhiMi05ODg4LTE3NWQ0NzNjNTdmYiIsIkVtcGxveWVlQ29kZSI6IjA5OSIsIk5hbWUiOiJFbXBsb3llZSIsIkNyZWF0ZWRCeSI6ImQ3MjE1YTkyLTA3M2UtNGZmMi1iN2ZkLWU4NDdlYTc0ZDk1NiIsIm5iZiI6MTcxNTI4NDU4OCwiZXhwIjoxNzQ2ODIwNTg4LCJpYXQiOjE3MTUyODQ1ODgsImlzcyI6IklXYW50QXBwSXNzdWVyIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzMjIvIn0.Jnzr04kO3pc3pabD7Uq6_FO21ORmpIla1gKfnzKwDFA"
            }
            });

            toast.success("Produto salvo com sucesso!");
        }
        catch (error) {
            console.log(error);
            toast.error("Algum erro aconteceu");
        }
    }

    return (
        <Form className="container">
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    style={{ width: '300px' }}
                    type="text"
                    placeholder="Nome do produto"
                    value={name}
                    onChange={(event) => setName(event.target.value)}                    
                    className={(name || !submitted) ? (name ? "is-valid" : "") : "form-control is-invalid"}
                />
                <div className="invalid-feedback">
                    O campo Nome é obrigatório.
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    style={{ width: '300px' }}
                    type="text"
                    placeholder="Descrição do produto"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className={(description || !submitted) ? (description ? "is-valid" : "") : "form-control is-invalid"}
                />
                <div className="invalid-feedback">
                    O campo Descrição é obrigatório.
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Categoria</Form.Label>               
                <Form.Select                        
                    style={{ width: '300px' }}
                    type="text"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className={(category || !submitted) ? (category ? "is-valid" : "") : "form-control is-invalid"}
                >                
                    <option value="">Selecionar</option>
                    {categories.map(item => 
                        <option key={item.id} value={item.id}>{item.name}</option>                        
                    )}                        
                </Form.Select>                    
                <div className="invalid-feedback">
                    O campo Categoria é obrigatório.
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAmount">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                    style={{ width: '300px' }}
                    type="text"
                    placeholder="Preço do produto"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className={(price || !submitted) ? (price ? "is-valid" : "") : "form-control is-invalid"}
                />
                <div className="invalid-feedback">
                    O campo Preço é obrigatório.
                </div>
            </Form.Group>

            <Button className="mb-3" variant="primary" type="submit" onClick={() => createProduct() } >
                Criar
            </Button>

            <div>
                <Button
                    as={Link}
                    to="/products"
                    variant="secondary" >
                    Voltar
                </Button>
            </div>
            
        </Form>
    )
}

export default ProductsAdd;