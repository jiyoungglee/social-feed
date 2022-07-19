import { useEffect } from 'react';

function TextForm(props) {
  useEffect(() => {
    function autoGrow() {
      if (props.textRef.current.scrollHeight > props.minHeight) {
        props.textRef.current.style.height = "auto";
        props.textRef.current.style.height = (props.textRef.current.scrollHeight) + "px";
      }
    }
    if(props.type === "edit") {
      props.textRef.current.focus()
    }
    autoGrow()
  },[props.textRef, props.textContent, props.minHeight, props.type]);
  

  function handleInputChange(event) {
    props.setTextContent(event.target.value);
  };

  function handleSubmit(event) {
    if(event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (props.textContent.length !== 0) props.submitText();
    }
  }

  return (
    <textarea
      ref={props.textRef}
      rows={props.rows}
      placeholder={props.placeholder}
      onChange={handleInputChange}
      value={props.textContent}
      onKeyDown={handleSubmit}
    />
  )
}

export default TextForm;
