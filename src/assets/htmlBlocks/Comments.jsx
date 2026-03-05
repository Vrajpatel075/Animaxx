import React, { useState } from 'react'
import '../cssBlocks/Comments.css'
import { FaAngleUp, FaChevronDown, FaRegComment } from 'react-icons/fa'

function Comments({currMode}) {
     const [viewComments , setviewComments] = useState(false);

  return (
    <div>
        <div className={`PostComments ${currMode === "light" ? "light" :"night"}`}>
            <div className="comments">
                <h2>comments</h2>
                <span
                onClick={() => setviewComments(prev => !prev)}>
                {viewComments  ?<FaAngleUp/> : <FaChevronDown/>}
                </span>
            </div>

            <div className="CommentInput">
                <span><FaRegComment/> </span>
                <input type="text" 
                placeholder='Comment' 
                className={`${currMode === "light" ? "light" : "dark"}`} />
            </div>
                
            {viewComments && (
                    <div className="allComments">
                        <div className="sigleComment">
                            <h4>Lorem, ipsum dolor.</h4>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="sigleComment">
                            <h4>Lorem, ipsum dolor.</h4>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="sigleComment">
                            <h4>Lorem, ipsum dolor.</h4>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
            )}
                
        </div>
    </div>
  )
}

export default Comments