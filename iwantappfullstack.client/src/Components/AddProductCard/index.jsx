import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function AddProductCard() {
    return (
        <Button
            as={Link}
            to="/products/add"
            variant="btn btn-outline-primary"
            style={{ width: '18rem' }}
            className="d-flex justify-content-center align-items-center ">
            Adicionar
        </Button>
    )
}

export default AddProductCard;