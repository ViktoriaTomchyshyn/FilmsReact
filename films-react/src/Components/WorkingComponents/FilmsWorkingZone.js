import React, { useCallback, useEffect, useState } from 'react';

function FilmsWorkingZone() {
  const [operation, setOperation] = useState('');

  useEffect(()=>{
    const txtArea = document.getElementById('txtArea');

    const createFilm = document.getElementById('CreateFilm');
    const createFilmf = () => {
      setOperation('create');
      txtArea.value = '';
    };
    createFilm.addEventListener('click', createFilmf);

    const readFilm = document.getElementById('ReadFilm');
    const readFilmf = () => {
      setOperation('read');
      txtArea.value = '';
    }
    readFilm.addEventListener('click', readFilmf);

     const updateFilm = document.getElementById('UpdateFilm');
    const updateFilmf = () => {
      setOperation('update');
      txtArea.value = '';
    }
    updateFilm.addEventListener('click', updateFilmf);

      const deleteFilm = document.getElementById('DeleteFilm');
      const deleteFilmf = () => {
      setOperation('delete');
      txtArea.value = '';
    }
      deleteFilm.addEventListener('click', deleteFilmf);

    return () => {
      createFilm.removeEventListener('click', createFilmf);
      readFilm.removeEventListener('click', readFilmf);
      updateFilm.removeEventListener('click', updateFilmf);
      deleteFilm.removeEventListener('click', deleteFilmf);
    }
  },[]);

  const sendRequest = useCallback(async () => {
    if(operation === 'read'){
        let response = await fetch('https://localhost:7093/api/Film', {
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
        const linkk = document.getElementById('link').value;

        let film = {
            link: linkk,
        }

        let response = await fetch('https://localhost:7093/api/Film', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
            body: JSON.stringify(film)
      });

      alert(response.status);
    }

    else if(operation === 'update'){
        const id = document.getElementById('id').value;
        const linkk = document.getElementById('link').value;

    let film = {
      link: linkk,
    }
  
        let response = await fetch('https://localhost:7093/api/Film/' + id, {

          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          method: 'PUT',
            body: JSON.stringify(film)
        });

        alert(response.status);
      }

      else if(operation === 'delete'){  
        const id = document.getElementById('id').value;
  
        let response = await fetch('https://localhost:7093/api/Film/' + id, {
          method: 'DELETE',
        });

        alert(response.status);
      }
  }, [operation]);

  return (
    <div id = 'fractalsWorkingZone'>
      <div id = 'fractalRenderMenu'>
        <div className = 'RenderMenuTitle'>
            {operation + ' '}Films
        </div>

        <div id = 'RenderMenuButtons'>
                  <div class='RenderMenuButton' id= 'CreateFilm'>
                CREATE
            </div>
                  <div class='RenderMenuButton' id= 'ReadFilm'>
                READ
            </div>
                  <div class='RenderMenuButton' id= 'UpdateFilm'>
                UPDATE
            </div>
                  <div class='RenderMenuButton' id= 'DeleteFilm'>
                DELETE
            </div>
        </div>

        <button class='sendBut' onClick={sendRequest}>SEND REQUEST</button>
      </div>
          <div id='fields'>
        {operation === 'read' &&<label>Press SEND REQUEST to get data</label>}
        {operation === 'read' && <textarea id='txtArea'></textarea>}
        {(operation === 'update' || operation === 'delete') && <label>ID</label>}
        {(operation ==='update' || operation === 'delete') && <input type={'text'} id ='id'></input>}
        {(operation === 'update' || operation === 'create') && <label>Link</label>}
        {(operation ==='update' || operation === 'create') && <input type={'text'} id ='link'></input>}
      </div>
    </div>
  )
}

export default FilmsWorkingZone;
