import React from 'react'

function Card({data}) {
    console.log(data)
    const {image,title,description}=data
    return (
        <div className={"box"}>
            <div>
                {image==null?<div className={"image"}></div>:<div><img className={"image_view"} src={image} alt={title}/></div>}
            </div>
            <div className={"heading"}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )

}

export default Card
