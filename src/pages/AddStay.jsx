// import { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { saveStay, loadStays } from '../store/actions/stay.actions.js'
// import { stayService } from '../services/stayService.js'

// export function AddStay() {
//     const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())
//     const { stayId } = useParams()
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const user = useSelector(state => state.userModule.loggedinUser)

//     useEffect(() => {
//         if (!stayId) return
//         stayService.get(stayId)
//             .then(stay => setStayToEdit(stay))
//     }, [stayId])

//     function handleChange(ev) {
//         const { type, name } = ev.target
//         let value = ev.target.value
//         if (type === 'number') value = +value
//         if (type === 'select-multiple') value = Array.from(ev.target.selectedOptions, o => o.value)
//         setStayToEdit(prev => ({ ...prev, [name]: value }))
//     }

//     function handleLocChange(ev) {
//         const { name, value } = ev.target
//         setStayToEdit(prev => ({ ...prev, loc: { ...prev.loc, [name]: value } }))
//     }

//     function handleImgUpload(ev) {
//         const file = ev.target.files[0]
//         if (!file) return
//         const url = URL.createObjectURL(file)
//         setStayToEdit(prev => ({ ...prev, imgUrls: [...prev.imgUrls, url] }))
//     }

//     function onSave(ev) {
//         ev.preventDefault()
//         dispatch(saveStay({ ...stayToEdit, host: user }))
//         dispatch(loadStays())
//         navigate('/')
//     }

//     return (
//         <section className="add-stay">
//             <div className="add-stay-form">
//                 <div className="form-field">
//                     <label>Name</label>
//                     <input name="name" value={stayToEdit.name} onChange={handleChange} placeholder="Name" />
//                 </div>

//                 <div className="form-field">
//                     <label>Address</label>
//                     <div className="address-fields">
//                         <input name="city" value={stayToEdit.loc.city || ''} onChange={handleLocChange} placeholder="City" />
//                         <input name="country" value={stayToEdit.loc.country || ''} onChange={handleLocChange} placeholder="Country" />
//                         <input name="street" value={stayToEdit.loc.street || ''} onChange={handleLocChange} placeholder="Street" />
//                     </div>
//                 </div>

//                 <div className="form-field upload-field">
//                     <label htmlFor="img-upload">
//                         <div className="upload-area">
//                             <span className="upload-icon">☁️</span>
//                             <p>Drop file here or <span className="upload-link">click to upload</span></p>
//                         </div>
//                     </label>
//                     <input id="img-upload" type="file" accept="image/*" onChange={handleImgUpload} hidden />
//                 </div>

//                 <div className="form-row">
//                     <div className="form-field">
//                         <label>Capacity</label>
//                         <input type="number" name="capacity" value={stayToEdit.capacity} onChange={handleChange} />
//                     </div>
//                     <div className="form-field">
//                         <label>Bedrooms</label>
//                         <input type="number" name="bedrooms" value={stayToEdit.bedrooms || 0} onChange={handleChange} />
//                     </div>
//                     <div className="form-field">
//                         <label>Bathrooms</label>
//                         <input type="number" name="bathrooms" value={stayToEdit.bathrooms || 0} onChange={handleChange} />
//                     </div>
//                 </div>

//                 <div className="form-row">
//                     <div className="form-field">
//                         <label>Labels</label>
//                         <select name="labels" onChange={handleChange}>
//                             <option value="">Select labels</option>
//                             <option value="Beachfront">Beachfront</option>
//                             <option value="Mountains">Mountains</option>
//                             <option value="City">City</option>
//                             <option value="Countryside">Countryside</option>
//                         </select>
//                     </div>
//                     <div className="form-field">
//                         <label>Property type</label>
//                         <select name="type" value={stayToEdit.type} onChange={handleChange}>
//                             <option value="">Select room type</option>
//                             <option value="Entire home">Entire home</option>
//                             <option value="Private room">Private room</option>
//                             <option value="Shared room">Shared room</option>
//                         </select>
//                     </div>
//                     <div className="form-field">
//                         <label>Price</label>
//                         <input type="number" name="price" value={stayToEdit.price} onChange={handleChange} />
//                     </div>
//                 </div>

//                 <div className="form-field">
//     <label>Amenities</label>
//     <div className="amenities-grid">
//         {['Wifi', 'Pool', 'Kitchen', 'Parking', 'Air conditioning', 'Washer', 'Dryer', 'Gym'].map(amenity => (
//             <label key={amenity} className="amenity-checkbox">
//                 <input
//                     type="checkbox"
//                     checked={stayToEdit.amenities.includes(amenity)}
//                     onChange={ev => {
//                         if (ev.target.checked) {
//                             setStayToEdit(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }))
//                         } else {
//                             setStayToEdit(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }))
//                         }
//                     }}
//                 />
//                 {amenity}
//             </label>
//         ))}
//     </div>
// </div>

//                 <div className="form-field">
//                     <label>Description</label>
//                     <textarea name="summary" value={stayToEdit.summary} onChange={handleChange} placeholder="Description" />
//                 </div>

//                 <button className="btn-save" onClick={onSave}>Save</button>
//             </div>
//         </section>
//     )
// }

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveStay, loadStays } from '../store/actions/stay.actions.js'
import { stayService } from '../services/stayService.js'

const AMENITIES = ['Wifi', 'Pool', 'Kitchen', 'Parking', 'Air conditioning', 'Washer', 'Dryer', 'Gym']
const LABELS = ['Beachfront', 'Mountains', 'Castles', 'Beach', 'City', 'Countryside', 'Cabins']
const PROPERTY_TYPES = ['Entire home', 'Private room', 'Shared room']

export function AddStay() {
    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())
    const { stayId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.loggedinUser)

    useEffect(() => {
        if (!stayId) return
        stayService.get(stayId).then(stay => setStayToEdit(stay))
    }, [stayId])

    function handleChange(ev) {
        const { type, name } = ev.target
        let value = ev.target.value
        if (type === 'number') value = +value
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

    function toggleAmenity(amenity) {
        setStayToEdit(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }))
    }

    function toggleLabel(label) {
        setStayToEdit(prev => ({
            ...prev,
            labels: prev.labels.includes(label)
                ? prev.labels.filter(l => l !== label)
                : [...prev.labels, label]
        }))
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
                        {['city', 'country', 'street'].map(field => (
                            <input key={field} name={field} value={stayToEdit.loc[field] || ''} onChange={handleLocChange} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} />
                        ))}
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

                <div className="form-row" >
                    {['capacity', 'bedrooms', 'bathrooms'].map(field => (
                        <div key={field} className="form-field">
                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input type="number" name={field} value={stayToEdit[field] || 0} onChange={handleChange} />
                        </div>
                    ))}
                </div>

                <div className="form-row dd">
                    <div className="form-field ">
                        <label>Labels</label>
                        <div className="tags-input ">
                            {stayToEdit.labels.map(label => (
                                <span key={label} className="tag">
                                    {label}
                                    <button onClick={() => toggleLabel(label)}>×</button>
                                </span>
                            ))}
                            <select onChange={ev => { if (ev.target.value) { toggleLabel(ev.target.value); ev.target.value = '' } }}>
                                <option value="">Add label...</option>
                                {LABELS.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-field">
                        <label>Property type</label>
                        <select name="type" value={stayToEdit.type} onChange={handleChange}>
                            <option value="">Select room type</option>
                            {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Price</label>
                        <input type="number" name="price" value={stayToEdit.price} onChange={handleChange} />
                    </div>
                </div>

              <div className="form-field">
    <label>Amenities</label>
    <div className="tags-input">
        {stayToEdit.amenities.map(amenity => (
            <span key={amenity} className="tag">
                {amenity}
                <button onClick={() => toggleAmenity(amenity)}>×</button>
            </span>
        ))}
        <select onChange={ev => { if (ev.target.value) { toggleAmenity(ev.target.value); ev.target.value = '' } }}>
            <option value="">Add amenity...</option>
            {AMENITIES.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
    </div>
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