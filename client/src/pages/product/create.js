import React, {useState, Fragment} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import {Redirect} from "react-router-dom";

export const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        images: ''
    })

    const [redirect, setRedirect] = useState(false)

    const [varieties, setVarieties] = useState([
        { size: '', color: '', quantity: '', price: '' }
    ]);

    const handleSubmit = e => {
        e.preventDefault();

        const form = new FormData();
        form.append('name', formData.name);
        form.append('description', formData.description);

        varieties.forEach(item => {
            if (item.size.trim() && item.price.trim() && item.color.trim() && item.quantity.trim()) {
                form.append('varieties[]', item)
            }
        })

        for (const key of Object.keys(formData.images)) {
            form.append('images', formData.images[key])
        }

        fetch('/api/v1/products', {
            method: 'POST',
            body: form
        })
            .then(r => {
                setRedirect(true)
            })
            .catch(e => console.log(e));
    };

    const handleInputChange = (index, event) => {
        const values = [...varieties];
        switch (event.target.name) {
            case 'size':
                values[index].size = event.target.value;
                break
            case 'color':
                values[index].color = event.target.value;
                break
            case 'quantity':
                values[index].quantity = event.target.value;
                break
            case 'price':
                values[index].price = event.target.value;
                break
            default:
                // do nothing
        }

        setVarieties(values);
    };

    const handleAddFields = () => {
        const values = [...varieties];
        values.push({ size: '', color: '', quantity: '', price: '' });
        setVarieties(values);
    };

    const handleRemoveFields = index => {
        const values = [...varieties];
        values.splice(index, 1);
        setVarieties(values);
    };

    if (redirect) {
        return <Redirect to='/' />;
    }

    return (
        <Container>
            <Row>
                <Col sm={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="form.name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" value={formData.name} placeholder="product name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group controlId="form.images" className="mb-3">
                            <Form.Label>Product Images</Form.Label>
                            <Form.Control onChange={(e) => setFormData({...formData, images: e.target.files})} type="file" multiple />
                        </Form.Group>

                        <hr/>

                        <div className="d-flex justify-content-between mb-3">
                            <h2>Varieties</h2>
                            <Button variant="outline-secondary" onClick={() => handleAddFields()}>Add field</Button>
                        </div>

                        {varieties.map((inputField, index) => (
                            <Fragment key={`${inputField}~${index}`}>
                                <Row>
                                    <Col xs={6} sm={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" name="size" onChange={event => handleInputChange(index, event)} value={varieties.size} placeholder="Size" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} sm={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text" name="color" onChange={event => handleInputChange(index, event)} value={varieties.color} placeholder="Color" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={5} sm={2}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="number" name="quantity" onChange={event => handleInputChange(index, event)} value={varieties.quantity} placeholder="Quantity" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={5} sm={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="number" name="price" onChange={event => handleInputChange(index, event)} value={varieties.price} placeholder="Price" />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} sm={1}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="button"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" onClick={() => handleRemoveFields(index)}
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="feather feather-x-octagon">
                                            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
                                            <line x1="15" y1="9" x2="9" y2="15"/>
                                            <line x1="9" y1="9" x2="15" y2="15"/>
                                        </svg>
                                    </Col>
                                </Row>
                            </Fragment>
                        ))}

                        <Form.Group className="mb-3">
                            <Button type="submit">Submit</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col sm={4}>Sidebar here...</Col>
            </Row>
        </Container>
    )
}
