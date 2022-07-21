import { useState } from 'react';
import TextForm from './TextForm';

function Editable({ originalText, saveEdit, editRef }) {
  const [textContent, setTextContent] = useState(originalText);

  return (
    <TextForm
      textRef = {editRef}
      rows="1"
      submitText = {() => saveEdit(textContent)}
      textContent = {textContent}
      setTextContent = {setTextContent}
      minHeight = {16}
      type= "edit"
    />
  )
}

export default Editable;