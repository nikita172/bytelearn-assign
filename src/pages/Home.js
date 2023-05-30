import React, { useState, useEffect, useRef } from 'react'
import DownArrow from "../icons/arrow-down.svg"
import "./home.css"
const Home = () => {
  const [dragHover, setDragHover] = useState(null);
  const [isAllNumbers, setIsAllNumbers] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(false);
  const [data, setData] = useState([]); // options array
  const [elements, setElements] = useState([]); // input array
  const [isDragStart, setIsDragStart] = useState(false);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragItemElement = useRef();

  const arr = [];
  const arr2 = ["Drop", "Drop", "Drop", "Drop", "Drop",];

  for (let i = 0; i < 5; i++) {
    arr.push(Math.floor(Math.random() * 100) + 1);
  }

  useEffect(() => {
    setData(arr);
    setElements(arr2);
  }, [result])

  function checkNumbers() {
    setElements((item) => {
      let check = item.every(element => typeof element === 'number');
      setIsAllNumbers(check);
      return item;
    })
  }

  const drop = (e) => {
    if (dragItem.current == null) {
      let value = (elements[dragItemElement.current]);
      const _elements = [...elements];
      _elements[dragOverItem.current] = value;
      _elements.splice(dragItemElement.current, 1, "Drop")
      setElements(_elements);
      dragItemElement.current = null;
      setIsDragStart(!isDragStart)
      setDragHover(null);
      return;
    }

    let value = data[dragItem.current];
    const _data = [...data];
    const allItems = _data.filter((item, index) => index !== dragItem.current);
    setData(allItems);
    const _elements = [...elements];
    _elements[dragOverItem.current] = value;
    setElements(_elements);
    checkNumbers();
    dragItem.current = null;
    dragOverItem.current = null;
    setIsDragStart(!isDragStart)
    setDragHover(null);
  }

  const onOptionsDrop = () => {
    console.log(elements[dragOverItem.current])
    const _elements = [...elements];
    const val = _elements[dragOverItem.current]
    _elements[dragOverItem.current] = "Drop";
    setElements(_elements);
    setData((items) => [...items, val])
    dragOverItem.current = null;
    checkNumbers();
    setDragHover(null);
  }

  const checkSort = () => {
    function sorted(arr) {
      let second_index;
      for (let first_index = 0; first_index < arr.length; first_index++) {
        second_index = first_index + 1;
        if (arr[second_index] - arr[first_index] < 0) return false;
      }
      return true;
    }
    let val = sorted(elements);
    setResult(val);
    setShowResult(true);
  }

  const resetBtn = () => {
    setResult(!result);
    setShowResult(false);
    setIsAllNumbers(false);
  }

  const dragEnd = () => {
    dragItem.current = null;
    setIsDragStart(!isDragStart)
  }
  const checkHover = () => {
    setDragHover(dragOverItem.current)
  }
  const dragLeave = () => {
    setDragHover(null)
  }
  const allowDrop = (e) => {
    e.preventDefault();
    setDragHover(dragOverItem.current)
  }


  return (
    <div className='homeContainer'>
      <div className="heading">Arrange the values in Ascending order</div>
      {
        showResult ?
          <div className='resultContainer'>
            <div className='resultHeading'>{result ? <>Correct Answer <img className='tick' src="https://static.vecteezy.com/system/resources/previews/017/177/933/original/round-check-mark-symbol-with-transparent-background-free-png.png" ></img></> : <>Wrong Answer <div className='cross'>X</div></>}</div>
            <button onClick={resetBtn} className={result ? "correctBtn" : "resetBtn"}>RESET</button>
          </div>
          :
          <>
            <div className="dropContainer">
              {elements.map((item, index) => (
                <div key={index}
                  id={index == dragHover ? "setOpacity" : ""}
                  className={typeof (item) == "number" ? "hideBorder" : "value"}
                  onDragOver={allowDrop}
                  onDragStart={e => dragItemElement.current = index}
                  onDragLeave={dragLeave}
                  draggable={typeof (item) == "number" ? "true" : "false"}
                  onDragEnter={e => {
                    dragOverItem.current = index
                    checkHover();
                  }}
                  onDrop={drop}
                >
                  <div className={typeof (item) == "number" ? "fiveDot" : "hideFiveDot"}>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                  </div>
                  <img className={typeof (item) == "number" ? "disableArrow" : "downArrowIcon"} src={DownArrow} />
                  <>{item}</>
                </div>
              ))}
            </div>
            <div className="values" onDrop={onOptionsDrop}>
              {data?.map((item, index) => (
                <div key={index}
                  className={index == dragItem.current ? "dragStarting" : "options"}
                  draggable
                  onDragOver={allowDrop}
                  onDragStart={(e) => dragItem.current = index}
                  onDragEnd={dragEnd}
                >
                  <div className='fiveDot'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                  </div>
                  <>{item}</>
                </div>
              ))}
            </div>
            <button className="button" onClick={checkSort} disabled={isAllNumbers ? false : true}>Check Answer</button>
          </>
      }
    </div >
  )
}

export default Home