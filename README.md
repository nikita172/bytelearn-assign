### Hi, so how I make this project using HTML drag and drop api 👉🏻

1. Firstly I create one "option" array to store random numbers and an "inputArray" object.
2. when we call ondrop event from the option array it take values of that element using useRef hook and insert in inputState Object.
3. And If we want to put an element on the existing one , so it update the input array.
4. when we swap elements in inputArray object, we pass the swap=true on the onDragStart event, so it will consider that we want to swap it in inputState object.
5. Option array is not changing here. It renders only that element which is not inside the inputState Object.
6. Input part renders the element which is inside the inputState object.
7. That is the main logic of this project and rest of the thing are in the code.

