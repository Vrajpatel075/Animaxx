import React from 'react'
import '../cssBlocks/Blog.css'

function Blog() {
  return (
    <>
     <div id="blog" className="autoshowbox">
        <div className="autoshow-circle">
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-img-with-svg-mark">
                        <div className="dis"><span>possimus maxime, error vitae sapiente voluptatem pariatur fuga eligendi eum repellendus quam asperiores earum ipsa quibusdam ex molestias necessitatibus magni tempora! Consectetur animi voluptatum ea in labore. Tenetur cumque accusamus laudantium velit iure est quaerat dolore! dolor sit amet consectetur adipisicing elit. Saepe vel aspernatur quia perferendis praesentium quas architecto a ipsa consectetur nihil beatae possimus nulla et, impedit odio minus, voluptas ducimus pariatur eaque necessitatibus eius. Esse facere minus ut dolore, voluptatibus quidem in itaque vel et, nobis sequi voluptatem laudantium quaerat obcaecati!</span></div>
                    </div>
                </div>

                <div className="button top-center">
                    <div className="title"><span>BLOGS</span></div>
                </div>
                <div className="button button-right">
                    <span className="dis">
                        <i className="fa-solid fa-quote-left"></i>
                        some people Don't realise how much they have helped you heal by simply being part of your life :)
                        <i className="fa-solid fa-quote-right"></i>
                    </span>
                </div>
            </div>
         </div>
     </div>
    </>
  )
}

export default Blog