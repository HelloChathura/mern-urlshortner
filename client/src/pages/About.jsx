import React from 'react'
import { useParams } from 'react-router-dom';

export default function About() {
  const { id } = useParams();
  //console.log(id);
  return (
    <div>{id}</div>

  )
}
