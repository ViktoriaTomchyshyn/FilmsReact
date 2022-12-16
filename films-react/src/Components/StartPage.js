import React from 'react'
import { Link } from 'react-router-dom';

function StartPage() {
  return (
      <div id='startSection'>
          <div className="RenderMenuTitle">
              Films collection
        </div>
          <div className="RenderMenuTitle">
            <Link to="/films" style={{ textDecoration: 'none' }}>
                <div >
                    <div>All films</div>
                </div>
            </Link>
            <Link to="/recommendations" style={{ textDecoration: 'none' }}>
                <div >
                    <div>Recommendations</div>
                </div>
              </Link>
              <Link to="/comments" style={{ textDecoration: 'none' }}>
                  <div >
                      <div>Comments</div>
                  </div>
              </Link>
        </div>
      </div>
  )
}

export default StartPage
