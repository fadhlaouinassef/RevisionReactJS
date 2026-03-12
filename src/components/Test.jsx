import React, { useEffect, useState } from 'react'

export const Test = ({title, description, link}) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("hello useEffect");
    }, [])

    return (
        <div>
            <h1> {title} </h1>
            <p> {description} </p>
            <a href={link}>link</a>

            <h1>Count : {count} </h1>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    );
}
  

