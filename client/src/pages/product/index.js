import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap'
export const Products = () => {
    const [products, setProducts] = useState([]);
    const [hasError, setError] = useState(false);
    async function fetchData() {
        const res = await fetch("/api/v1/products");
        res
            .json()
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                setError(error);
            });
    }

    useEffect(() => { fetchData(); }, []);
    return (
        <main>
            <Container>
                <div className="row justify-content-center">
                    <div className="col-md-6 align-self-center text-center">
                        <h1 className="title">Avios Ventures</h1>
                        <h6 className="subtitle op-8">
                            best place where buyers meet sellers
                        </h6>
                    </div>
                </div>
                <Row xs={1} md={3} className="g-4 mt-5">
                    {products.map(product => (
                        <Col key={product.id}>
                            <Card>
                                {product.images && product.images.length > 0 && <Card.Img variant="top" src={`http://localhost:5000/${product.images[0]}`} />}
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        {product.images}
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                    </Card.Text>
                                    {/*{product.varieties && product.varieties.length > 0 && <div>${JSON.stringify(product.varieties[0].size)}</div>}*/}
                                    <Card.Link href="#" className="btn btn-outline-primary">Add to cart</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </main>
    );
};
