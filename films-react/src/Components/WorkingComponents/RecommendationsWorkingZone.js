import React, { useEffect, useState, useCallback } from 'react';

function RecommendationsWorkingZone() {
    const [operation, setOperation] = useState('');

    useEffect(()=>{
        const createRecommendation = document.getElementById('CreateRecommendation');
        const createRecommendationf = () => setOperation('create');
        createRecommendation.addEventListener('click', createRecommendationf);
  
        const readRecommendation = document.getElementById('ReadRecommendation');
        const readRecommendationf = () => setOperation('read');
        readRecommendation.addEventListener('click', readRecommendationf);
  
        const updateRecommendation = document.getElementById('UpdateRecommendation');
        const updateRecommendationf = () => setOperation('update');
        updateRecommendation.addEventListener('click', updateRecommendationf);
  
        const deleteRecommendation = document.getElementById('DeleteRecommendation');
        const deleteRecommendationf = () => setOperation('delete');
        deleteRecommendation.addEventListener('click', deleteRecommendationf);
  
      return () =>{
          createRecommendation.removeEventListener('click', createRecommendationf);
          readRecommendation.removeEventListener('click', readRecommendationf);
          updateRecommendation.removeEventListener('click', updateRecommendationf);
          deleteRecommendation.removeEventListener('click', deleteRecommendationf);
      }
    },[]);
  
    const sendRequest = useCallback(async () => {
      if(operation === 'read'){
          let response = await fetch('https://localhost:7093/api/Recommendation', {
          method: 'GET',
        });
  
        let data = await response.json();
  
        const txtArea = document.getElementById('txtArea');
        for(let i = 0; i< data.length; i++){
          txtArea.value += JSON.stringify(data[i]) + '\n \n';
        }

        alert(response.status);
      }
      else if(operation === 'create'){

          const filmid = document.getElementById('filmId').value;
          const recomendedFilmid = document.getElementById('recomendedFilmId').value;

          let recommendation = {
              filmId: filmid,
              recomendedFilmId: recomendedFilmid,
          }
          let response = await fetch('https://localhost:7093/api/Recommendation', {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          method: 'POST',
              body: JSON.stringify(recommendation)
        });

        alert(response.status);
      }

      else if(operation === 'update'){
          const filmid = document.getElementById('filmId').value;
          const recomendedFilmid = document.getElementById('recomendedFilmId').value;

          const id = document.getElementById('id').value;

          let recommendation = {
              filmId: filmid,
              recomendedFilmId: recomendedFilmid,
          }

          let response = await fetch('https://localhost:7093/api/Recommendation/' + id, {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'PUT',
              body: JSON.stringify(recommendation)
          });
  
          alert(response.status);
        }
  
        else if(operation === 'delete'){    
          const id = document.getElementById('id').value;

          let response = await fetch('https://localhost:7093/api/Recommendation/' + id, {
              method: 'DELETE',
            });

          alert(response.status );
          }
    }, [operation]);
  
    return (
      <div id = 'fractalsWorkingZone'>
        <div id = 'fractalRenderMenu'>
          <div className = 'RenderMenuTitle'>
              {operation + ' '}Recommendations
          </div>
  
          <div id = 'RenderMenuButtons'>
                    <div class='RenderMenuButton' id= 'CreateRecommendation'>
                  CREATE
              </div>
                    <div class='RenderMenuButton' id= 'ReadRecommendation'>
                  READ
              </div>
                    <div class='RenderMenuButton' id= 'UpdateRecommendation'>
                  UPDATE
              </div>
                    <div class='RenderMenuButton' id= 'DeleteRecommendation'>
                  DELETE
              </div>
          </div>
  
          <button class='sendBut' onClick={sendRequest}>SEND REQUEST</button>
        </div>
            <div id='fields'>
        {operation === 'read' && <label>Press SEND REQUEST to get data</label>}
        {operation === 'read' && <textarea id='txtArea' disabled></textarea>}
        {(operation === 'update' || operation === 'delete') && <label>ID</label>}
        {(operation === 'update' || operation === 'delete') && <input type={'text'} id ='id'></input>}
        {(operation === 'update' || operation === 'create') && <label>Film ID</label>}
        {(operation === 'update' || operation === 'create') && <input type={'text'} id='filmId'></input>}
        {(operation === 'update' || operation === 'create') && <label>Recommended film ID</label>}
        {(operation === 'update' || operation === 'create') && <input type={'text'} id ='recomendedFilmId'></input>}

      </div>
      </div>
    )
}

export default RecommendationsWorkingZone;
