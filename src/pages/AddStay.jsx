import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveStay, loadStays } from '../store/actions/stay.actions.js'
import { stayService } from '../services/stayService.js'

export function AddStay() {
    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())
    const { stayId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.loggedinUser)

    useEffect(() => {
        if (!stayId) return
        stayService.get(stayId)
            .then(stay => setStayToEdit(stay))
    }, [stayId])

    function handleChange(ev) {
        const { type, name } = ev.target
        let value = ev.target.value
        if (type === 'number') value = +value
        if (type === 'select-multiple') value = Array.from(ev.target.selectedOptions, o => o.value)
        setStayToEdit(prev => ({ ...prev, [name]: value }))
    }

    function handleLocChange(ev) {
        const { name, value } = ev.target
        setStayToEdit(prev => ({ ...prev, loc: { ...prev.loc, [name]: value } }))
    }

    function handleImgUpload(ev) {
        const file = ev.target.files[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setStayToEdit(prev => ({ ...prev, imgUrls: [...prev.imgUrls, url] }))
    }

    function onSave(ev) {
        ev.preventDefault()
        dispatch(saveStay({ ...stayToEdit, host: user }))
        dispatch(loadStays())
        navigate('/')
    }

    return (
        <section className="add-stay">
            <div className="add-stay-form">
                <div className="form-field">
                    <label>Name</label>
                    <input name="name" value={stayToEdit.name} onChange={handleChange} placeholder="Name" />
                </div>

                <div className="form-field">
                    <label>Address</label>
                    <div className="address-fields">
                        <input name="city" value={stayToEdit.loc.city || ''} onChange={handleLocChange} placeholder="City" />
                        <input name="country" value={stayToEdit.loc.country || ''} onChange={handleLocChange} placeholder="Country" />
                        <input name="street" value={stayToEdit.loc.street || ''} onChange={handleLocChange} placeholder="Street" />
                    </div>
                </div>

                <div className="form-field upload-field">
                    <label htmlFor="img-upload">
                        <div className="upload-area">
                            <span className="upload-icon">☁️</span>
                            <p>Drop file here or <span className="upload-link">click to upload</span></p>
                        </div>
                    </label>
                    <input id="img-upload" type="file" accept="image/*" onChange={handleImgUpload} hidden />
                </div>

                <div className="form-row">
                    <div className="form-field">
                        <label>Capacity</label>
                        <input type="number" name="capacity" value={stayToEdit.capacity} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label>Bedrooms</label>
                        <input type="number" name="bedrooms" value={stayToEdit.bedrooms || 0} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <label>Bathrooms</label>
                        <input type="number" name="bathrooms" value={stayToEdit.bathrooms || 0} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-field">
                        <label>Labels</label>
                        <select name="labels" onChange={handleChange}>
                            <option value="">Select labels</option>
                            <option value="Beachfront">Beachfront</option>
                            <option value="Mountains">Mountains</option>
                            <option value="City">City</option>
                            <option value="Countryside">Countryside</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Property type</label>
                        <select name="type" value={stayToEdit.type} onChange={handleChange}>
                            <option value="">Select room type</option>
                            <option value="Entire home">Entire home</option>
                            <option value="Private room">Private room</option>
                            <option value="Shared room">Shared room</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Price</label>
                        <input type="number" name="price" value={stayToEdit.price} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-field">
                    <label>Amenities</label>
                    <select name="amenities" onChange={ev => setStayToEdit(prev => ({ ...prev, amenities: [...prev.amenities, ev.target.value] }))}>
                        <option value="">Select amenities</option>
                        <option value="Wifi">Wifi</option>
                        <option value="Pool">Pool</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Parking">Parking</option>
                        <option value="Air conditioning">Air conditioning</option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Description</label>
                    <textarea name="summary" value={stayToEdit.summary} onChange={handleChange} placeholder="Description" />
                </div>

                <button className="btn-save" onClick={onSave}>Save</button>
            </div>
        </section>
    )
}