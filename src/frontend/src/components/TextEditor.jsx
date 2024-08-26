import React, { useState, useRef, useEffect, useCallback } from "react"
import ReactQuill from "react-quill"
import Delta from "quill-delta"
import Draggabilly from "draggabilly"
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html"
import "react-quill/dist/quill.snow.css"

//TODO make delta of pass look like:
// {insert: {'my-blot': {id: 2, text: 'xyz'}},
// attributes: {renderAsBlock: true|false}}
let Inline = ReactQuill.Quill.import("blots/inline")
class PassBlot extends Inline {
  static create() {
    //value
    let node = super.create()
    node.setAttribute("pass-id", Date.now()) // value.id ||
    return node
  }

  /*static formats(domNode) {
    const { id } = domNode.dataset;
    return { id };
  }*/
  static formats(domNode) {
    return domNode.getAttribute("pass-id")
  }
}

PassBlot.blotName = "pass"
PassBlot.tagName = "span"
PassBlot.className = "pass-em"
ReactQuill.Quill.register(PassBlot)

function TextEditor() {
  function morphtoplay(ops) {
    let newops = []
    let newpasses = []
    ops.map((v, i) => {
      let v1 = { ...v }
      if (
        typeof v1.attributes !== "undefined" &&
        typeof v1.attributes.pass !== "undefined"
      ) {
        console.log("got pass", v)
        newpasses.push({
          id: v1.attributes.pass, //.id
          text: v1.insert,
        })
        //v1.attributes.pass.text = v1.insert;
        v1.insert = " "
      }
      newops.push(v1)
    })
    setPasses(newpasses)
    console.log(newpasses)
    return newops
  }

  const ops = [{ insert: "the sample text value" }]
  const [state, setState] = useState(new Delta(ops))
  const [playstate, setPlayState] = useState(new Delta(ops))
  const [passes, setPasses] = useState([])
  useEffect(() => {
    // console.log("state changed", state);
    //console.log(converter, html);
    //setContent1(html);
    setPlayState(new Delta(morphtoplay(state.ops)))
  }, [state])
  useEffect(() => {
    passes.map((v) => {
      var elem = document.querySelector("#pass_" + v.id)
      var draggie = new Draggabilly(elem, {})
      draggie.on("dragEnd", (e, pointer) => {
        // console.log(pointer);
        elem.style.display = "none"
        let x = e.clientX,
          y = e.clientY,
          elementMouseIsOver = document.elementFromPoint(x, y)
        // console.log(elementMouseIsOver, document.querySelectorAll(":hover"));
        if (elementMouseIsOver.classList.contains("pass-em")) {
          elementMouseIsOver.innerHTML = ""
          elementMouseIsOver.append(elem)
          elem.style.display = "inline"
        }
      })
    })
  }, [passes])
  const quillRef = useRef(null)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["code-block"],
      ["clean", "pass"],
    ],
  }
  const formats = [
    "pass",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ]

  // here is the state in delta format
  console.log(playstate)

  const imageHandler = useCallback(() => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0]
        console.log(file)
      }
    }
  }, [])

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={state}
        modules={{
          toolbar: {
            container: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["code-block"],
              ["clean"],
            ],
            handlers: {
              image: imageHandler,
            },
          },
          clipboard: {
            matchVisual: false,
          },
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
          "code-block",
        ]}
        onChange={(content, delta, source, editor) => {
          if (source === "user") {
            setState(editor.getContents())
          }
        }}
      />
      <hr />
      <code>{JSON.stringify(playstate)}</code>
      {/* <ReactQuill
        className="readonly"
        value={playstate}
        modules={modules}
        formats={formats}
        readOnly={true}
      /> */}
    </div>
  )
}
export default TextEditor
