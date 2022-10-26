import React , {useState , useRef, useEffect} from 'react'
import Test2 from './Test2'
import Test3 from './Test3'

export default function Test() {
let name = true

  return (
    <div>
        <button onClick={() => {
        name=!name
        console.log(name);
    }}>Click</button>
       {name && <Test2 name />}
        <Test3 />
    </div>
  )
}
