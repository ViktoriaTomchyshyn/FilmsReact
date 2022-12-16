import React, { useCallback, useEffect, useState } from 'react';

function CommentsWorkingZone() {
  const [operation, setOperation] = useState('');

  useEffect(()=>{
    const txtArea = document.getElementById('txtArea');

      const createComment = document.getElementById('CreateComment');
      const createCommentf = () => {
      setOperation('create');
      txtArea.value = '';
    };
      createComment.addEventListener('click', createCommentf);

      const readComment = document.getElementById('ReadComment');
      const readCommentf = () => {
      setOperation('read');
      txtArea.value = '';
    }
      readComment.addEventListener('click', readCommentf);

      const updateComment = document.getElementById('UpdateComment');
      const updateCommentf = () => {
      setOperation('update');
      txtArea.value = '';
    }
      updateComment.addEventListener('click', updateCommentf);

      const deleteComment = document.getElementById('DeleteComment');
      const deleteCommentf = () => {
      setOperation('delete');
      txtArea.value = '';
    }
      deleteComment.addEventListener('click', deleteCommentf);

    return () => {
        createComment.removeEventListener('click', createCommentf);
        readComment.removeEventListener('click', readCommentf);
        updateComment.removeEventListener('click', updateCommentf);
        deleteComment.removeEventListener('click', deleteCommentf);
    }
  },[]);

  const sendRequest = useCallback(async () => {
    if(operation === 'read'){
        let response = await fetch('https://localhost:7093/api/Comment', {
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
        const filmID = document.getElementById('filmId').value;
        const text = document.getElementById('comment').value;


        let comment = {
            filmId: filmID,
            comment1: text
        }

        let response = await fetch('https://localhost:7093/api/Comment', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
            body: JSON.stringify(comment)
      });

      alert(response.status);
    }

    else if(operation === 'update'){
        const id = document.getElementById('id').value;
        const filmID = document.getElementById('filmId').value;
        const text = document.getElementById('comment').value;
    

        let comment = {
            filmId: filmID,
            comment1: text
    }
  
        let response = await fetch('https://localhost:7093/api/Comment/' + id, {

          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          method: 'PUT',
            body: JSON.stringify(comment)
        });

        alert(response.status);
      }

      else if(operation === 'delete'){  
        const id = document.getElementById('id').value;
  
        let response = await fetch('https://localhost:7093/api/Comment/' + id, {
          method: 'DELETE',
        });

        alert(response.status);
      }
  }, [operation]);

  return (
    <div id = 'fractalsWorkingZone'>
      <div id = 'fractalRenderMenu'>
        <div className = 'RenderMenuTitle'>
            {operation + ' '}Comments
        </div>

        <div id = 'RenderMenuButtons'>
                  <div class='RenderMenuButton' id= 'CreateComment'>
                CREATE
            </div>
                  <div class='RenderMenuButton' id= 'ReadComment'>
                READ
            </div>
                  <div class='RenderMenuButton' id= 'UpdateComment'>
                UPDATE
            </div>
                  <div class='RenderMenuButton' id= 'DeleteComment'>
                DELETE
            </div>
        </div>

        <button class='sendBut' onClick={sendRequest}>SEND REQUEST</button>
      </div>
          <div id='fields'>
        {operation === 'read' && <label>Press SEND REQUEST to get data</label>}
        {operation === 'read' && <textarea id='txtArea'></textarea>}
        {(operation === 'update' || operation === 'delete') && <label>ID</label>}
        {(operation ==='update' || operation === 'delete') && <input type={'text'} id ='id'></input>}
        {(operation === 'update' || operation === 'create') && <label>Film ID</label>}
        {(operation ==='update' || operation === 'create') && <input type={'text'} id ='filmId'></input>}
        {(operation === 'update' || operation === 'create') && <label>Comment</label>}
        {(operation ==='update' || operation === 'create') && <input type={'text'} id ='comment'></input>}
      </div>
    </div>
  )
}

export default CommentsWorkingZone;
