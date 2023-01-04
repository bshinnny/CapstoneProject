import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as productActions from '../../../store/products';
import './CreateProductForm.css'

function CreateProductForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const user = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [color, setColor] = useState('');
    const [category, setCategory] = useState('');
    const [asin, setAsin] = useState('');
    const [prime, setPrime] = useState(false);
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);

    // console.log(description)

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = [];

        if (name.length > 149) errors.push('Name must be less than 150 characters.');
        if (price < 0.99 || price > 9999.99) errors.push('Price must be between $1 and $10,000.');
        if (brand.length > 29) errors.push('Brand must be less than 30 characters.');
        if (description.length > 254) errors.push('Description must be less than 255 characters.');
        if (length.length < 1 || length.length > 1000) errors.push('Length must be between 1 inch and 1000 inches.');
        if (width.length < 1 || width.length > 1000) errors.push('Width must be between 1 inch and 1000 inches.');
        if (height.length < 1 || height.length > 1000) errors.push('Height must be between 1 inch and 1000 inches.');
        if (weight.length < 1 || weight.length > 1000) errors.push('Weight must be between 1 inch and 1000 pounds.');
        if (color.length > 29) errors.push('Color must be less than 30 characters.');
        if (category.length > 39) errors.push('Category must be less than 40 characters.');
        if (asin.length > 39) errors.push('ASIN must be less than 30 characters.');
        if (image.length > 254) errors.push('Image URL must be less than 255 characters.');
        // Need to add validation for .jpg, .png ending.

        setErrors(errors);

        if (errors.length) {
            console.log(errors);
            return;
        }

        const newProduct = {
            name,
            price,
            brand,
            description,
            length,
            width,
            height,
            weight,
            color,
            category,
            asin,
            prime,
            image,
        };

        return dispatch(productActions.createAProductThunk(newProduct))
            .then((product) => {
                setName('')
                setPrice(0)
                setBrand('')
                setDescription('')
                setLength(0)
                setWidth(0)
                setHeight(0)
                setWeight(0)
                setColor('')
                setCategory('')
                setAsin('')
                setPrime('')
                setImage('')
                history.push(`/products/${product.id}`)
            })
    };

    return (
        <div className='create-product-form-cont'>
            <form className='create-product-form' onSubmit={handleSubmit}>
                <div className='product-form-header'>
                    <h2 className='product-form-title'>Create A New Product Listing</h2>
                </div>
                <ul className='errors'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='product-input-field'>
                    <label htmlFor='name'>Name: </label>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder='Product Name'
                        required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='price'>Price: </label>
                    <input
                        type='number' min='0' step='0.01'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder='Price'
                        required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='brand'>Brand: </label>
                    <input
                        type='text'
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand}
                        placeholder='Brand'
                        required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='description'>Description: </label>
                    <textarea
                        // type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder='Description'
                        required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='length'>Length: </label>
                    <input
                        type='number' min='0' step='0.1'
                        onChange={(e) => setLength(e.target.value)}
                        value={length}
                        placeholder='Length'
                        required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='width'>Width: </label>
                    <input
                        type='number' min='0' step='0.1'
                        onChange={(e) => setWidth(e.target.value)}
                        value={width}
                        placeholder='Width'
                        required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='Height'>Height: </label>
                    <input
                        type='number' min='0' step='0.1'
                        onChange={(e) => setHeight(e.target.value)}
                        value={height}
                        placeholder='Height'
                        required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='weight'>Weight: </label>
                    <input
                        type='number' min='0' step='0.1'
                        onChange={(e) => setWeight(e.target.value)}
                        value={weight}
                        placeholder='Weight'
                        required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='color'>Color: </label>
                    <input
                        type='text'
                        onChange={(e) => setColor(e.target.value)}
                        value={color}
                        placeholder='Color'
                        required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='category'>Category: </label>
                    <select
                        // type='text'
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        <option value='' disabled>
                            Product Category
                        </option>
                        <option value='Household'>Household</option>
                        <option value='Beauty'>Beauty</option>
                        <option value='Fashion'>Fashion</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>
                <div className='product-input-field'>
                    <label htmlFor='asin'>ASIN: </label>
                    <input
                        type='text'
                        onChange={(e) => setAsin(e.target.value)}
                        value={asin}
                        placeholder='ASIN'
                        required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='prime'>Prime? </label>
                    <input
                        type='checkbox'
                        onChange={() => setPrime(!prime)}
                        value={prime}
                        checked={prime}
                        // required
                        className='input'
                    />
                </div>
                <div className='product-input-field'>
                    <label htmlFor='image'>Image URL: </label>
                    <input
                        type='url'
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        required
                        className='input'
                    />
                </div>
                <button className='submit-button' type='submit'>Submit New Product</button>
            </form>
        </div>
    )
}

export default CreateProductForm;
